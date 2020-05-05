import { createSelector } from 'reselect';

const studentsSelector = (state) => state.data;

export const studentsTotalSelector = createSelector(
  studentsSelector,
  (students) =>
    students.map((student) => {
      let total = Object.values(student.marks).reduce((a, b) => a + b, 0);

      student.total = Math.round((total + Number.EPSILON) * 100) / 100;
      return student;
    })
);
