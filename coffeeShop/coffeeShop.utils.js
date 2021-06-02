export const splitCategory = (categories) => {
  return categories.map((category) => {
    const name = category;
    const slug = category.toLowerCase().replace(/[^\w-]+/g, "-");
    return {
      where: { slug },
      create: { name, slug },
    };
  });
};
