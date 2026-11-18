import test from 'node:test';
import assert from 'node:assert/strict';
import {
  normNum,
  gradeQuestion,
  gradeQuiz,
  isQuestionAnswered,
  isQuestionPartial,
  computeTopicMastery,
} from './quizLogic';
import { QUESTIONS } from '../data/questions';

test('normNum normalizes decimals, spaces, unicode minus, units, and scientific notation', () => {
  assert.equal(normNum('122,5'), 122.5);
  assert.equal(normNum('122.5'), 122.5);
  assert.equal(normNum('  122,5 m '), 122.5);
  assert.equal(normNum('10 m/s'), 10);
  assert.equal(normNum('1.2e3'), 1200);
  assert.equal(normNum('−4,5'), -4.5);
  assert.equal(normNum(''), null);
  assert.equal(normNum('abc'), null);
});

test('MCQ and Complex MCQ grading enforces exact rules', () => {
  const q1 = QUESTIONS[0]; // correctChoice = 3
  assert.equal(gradeQuestion(q1, { choice: 3 }).score, 10);
  assert.equal(gradeQuestion(q1, { choice: 3 }).status, 'benar');
  assert.equal(gradeQuestion(q1, { choice: 1 }).score, 0);
  assert.equal(gradeQuestion(q1, { choice: 1 }).status, 'salah');
  assert.equal(gradeQuestion(q1, undefined).status, 'kosong');

  const q3 = QUESTIONS[2]; // correctChoices = [0, 2, 4]
  assert.equal(gradeQuestion(q3, { choices: [4, 0, 2] }).score, 10);
  assert.equal(gradeQuestion(q3, { choices: [0, 2] }).score, 0);
  assert.equal(gradeQuestion(q3, { choices: [0, 1, 2, 4] }).score, 0);
});

test('True/False grading computes +2.5, -1, 0 and partial status accurately', () => {
  const q5 = QUESTIONS[4]; // [true, false, true, false]
  assert.equal(isQuestionAnswered(q5, { tf: [true, null, null, null] }), true);
  assert.equal(isQuestionPartial(q5, { tf: [true, null, null, null] }), true);
  assert.equal(isQuestionPartial(q5, { tf: [true, false, true, false] }), false);

  const allRight = gradeQuestion(q5, { tf: [true, false, true, false] });
  assert.equal(allRight.score, 10);
  assert.equal(allRight.status, 'benar');

  const mixed = gradeQuestion(q5, { tf: [true, true, true, null] });
  assert.equal(mixed.score, 4); // 2.5 - 1 + 2.5 + 0
  assert.equal(mixed.status, 'parsial');

  const allWrong = gradeQuestion(q5, { tf: [false, true, false, true] });
  assert.equal(allWrong.score, -4);
  assert.equal(allWrong.status, 'salah');
});

test('Numeric grading respects tolerance and clamps negative quiz totals at 0', () => {
  const q7 = QUESTIONS[6]; // 122.5 +- 0.5
  assert.equal(gradeQuestion(q7, { value: '122,5' }).score, 10);
  assert.equal(gradeQuestion(q7, { value: '122.9' }).score, 10);
  assert.equal(gradeQuestion(q7, { value: '124' }).score, 0);

  const resNegative = gradeQuiz(
    QUESTIONS,
    { 5: { tf: [false, true, false, true] } },
    'Nadia',
    'XI IPA 1',
    120
  );
  assert.equal(resNegative.rawTotal, -4);
  assert.equal(resNegative.finalScore, 0);
  assert.equal(resNegative.clamped, true);

  const fullAnswers = {
    1: { choice: 3 },
    2: { choice: 0 },
    3: { choices: [0, 2, 4] },
    4: { choices: [0, 1, 3] },
    5: { tf: [true, false, true, false] },
    6: { value: '72' },
    7: { value: '122,5' },
    8: { value: '180' },
    9: { value: '125' },
    10: { value: '10' },
  };
  const resFull = gradeQuiz(QUESTIONS, fullAnswers, 'Bima', 'XI IPA 2', 305);
  assert.equal(resFull.finalScore, 100);
  assert.equal(resFull.counts.benar, 10);
  assert.equal(resFull.counts.salah, 0);

  const mastery = computeTopicMastery(QUESTIONS, resFull.perQuestion);
  assert.equal(mastery.length, 4);
  assert.ok(mastery.every((m) => m.percent === 100 && m.statusLabel === 'Sangat Menguasai'));
});
