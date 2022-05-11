export default (filename: string) => {
  const [file, fileFormat] = filename.split(".");
  if (file.length < 16) return filename;
  const firstFour = file.substring(0, 8);
  const lastThree = file.substring(file.length - 8);
  return `${firstFour}...${lastThree}.${fileFormat}`;
};
