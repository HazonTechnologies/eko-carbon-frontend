export default (filename: string) => {
  const [file, fileFormat] = filename.split(".");
  if (file.length < 10) return filename;
  const firstFour = file.substring(0, 5);
  const lastThree = file.substring(file.length - 4);
  return `${firstFour}...${lastThree}.${fileFormat}`;
};
