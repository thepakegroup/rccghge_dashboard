// Redirect Link function
export const redirectLink = (group: any) => {
  const ministry_code = group?.ministry_code?.toLowerCase();
  //
  if (group?.group_template === "common-1")
    return `/ministry-departments/1/${ministry_code}`;
  if (group?.group_template === "common-2")
    return `/ministry-departments/2/${ministry_code}`;
  return `/ministry-departments/${ministry_code}`;
};
