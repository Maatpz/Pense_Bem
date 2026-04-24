import { program1 } from './zeCariocaProgram1';
// import { program2 } from './zeCariocaProgram2';
// import { program3 } from './zeCariocaProgram3';
// import { program4 } from './zeCariocaProgram4';
// import { program5 } from './zeCariocaProgram5';

export const programsByCode = {
  [program1.code]: program1,
  // [program2.code]: program2,
  // [program3.code]: program3,
  // [program4.code]: program4,
  // [program5.code]: program5,
};

export function getProgramByCode(code) {
  return programsByCode[code] || null;
}
