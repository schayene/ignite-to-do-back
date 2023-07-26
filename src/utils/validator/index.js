const translation = {
  title: "título",
  description: "descrição",
};

export function validator(fields, data) {
  let errors = [];

  fields.forEach((field) => {
    if (!data.hasOwnProperty(field)) {
      errors.push(`O campo ${translation[field]} deve ser passado.`);
    }
  });

  return {
    error: errors.length,
    message: errors.length && errors.join("\n"),
  };
}
