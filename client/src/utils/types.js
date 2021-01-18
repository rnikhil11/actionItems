export const types = {
  1: "SHORT_ANSWER",
  2: "LONG_ANSWER",
  3: "MULTIPLE_CHOICE",
  4: "CHECKBOXES",
  5: "DROPDOWN",
  6: "FILE_UPLOAD",
  7: "LINEAR_SCALE",
  8: "MULTIPLE_CHOICE_GRID",
  9: "CHECKBOX_GRID",
  10: "DATE",
  11: "TIME",
};

export const typeSchemas = {
  SHORT_ANSWER: "string",
  LONG_ANSWER: "string",
  MULTIPLE_CHOICE: "number",
  CHECKBOXES: "array",
  DROPDOWN: "number",
  FILE_UPLOAD: "string",
  LINEAR_SCALE: "number",
  MULTIPLE_CHOICE_GRID: "array",
  CHECKBOX_GRID: "array",
  DATE: "date",
  TIME: "time",
};
