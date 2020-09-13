const truncStringFromEnd = (string, maxSize = 19) => {
  const end = string.slice(-(maxSize - 3));

  return `...${end}`;
};

export default truncStringFromEnd;