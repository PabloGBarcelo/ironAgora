module.exports = function(results) {
  let allTags = {};
  results.forEach(post => {
    post.tags[0].split(',').forEach(tag => {
      let tagUp = tag.toUpperCase();
      if (!allTags[tagUp] && tagUp !== '') {
        allTags[tagUp] = 1;
      } else if (tagUp !== '') {
        allTags[tagUp]++;
      }
    });
  });

  let mainTags = Object.keys(allTags);
  mainTags.sort((keyOne, keyTwo) => {
    return allTags[keyTwo] - allTags[keyOne];
  }).splice(8);

  return mainTags;
};
