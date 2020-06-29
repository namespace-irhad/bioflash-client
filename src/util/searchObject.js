export default function search(nameKey, array) {
  for (var i = 0; i < array.length; i++) {
    if (array[i].name === nameKey) {
      return array[i];
    }
  }
}
