module.exports = function(migration) {
  migration.deleteContentType('contactPage');
  migration.deleteContentType('htmlWidget');
  migration.deleteContentType('homePageAssembly');
  migration.deleteContentType('mute');
};
