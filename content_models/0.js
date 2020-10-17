module.exports = function(migration) {
  const blog = migration
    .createContentType("blog")
    .name("Blog")
    .description("")
    .displayField("title");

  blog
    .createField("title")
    .name("title")
    .type("Symbol")
    .localized(false)
    .required(true)
    .validations([
      {
        unique: true
      }
    ])
    .disabled(false)
    .omitted(false);

  blog
    .createField("slug")
    .name("slug")
    .type("Symbol")
    .localized(false)
    .required(true)
    .validations([
      {
        unique: true
      }
    ])
    .disabled(false)
    .omitted(false);

  blog
    .createField("inspiration")
    .name("inspiration")
    .type("Symbol")
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);

  blog
    .createField("shortDescription")
    .name("shortDescription")
    .type("Symbol")
    .localized(false)
    .required(false)
    .validations([
      {
        unique: true
      }
    ])
    .disabled(false)
    .omitted(false);

  blog
    .createField("text")
    .name("text")
    .type("Text")
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);

  blog
    .createField("picture")
    .name("picture")
    .type("Link")
    .localized(false)
    .required(false)
    .validations([
      {
        linkMimetypeGroup: ["image"]
      },
      {
        assetFileSize: {
          min: null,
          max: 5242880
        }
      }
    ])
    .disabled(false)
    .omitted(false)
    .linkType("Asset");

  blog.changeEditorInterface("title", "singleLine", {});
  blog.changeEditorInterface("slug", "slugEditor", {});
  blog.changeEditorInterface("inspiration", "urlEditor", {});
  blog.changeEditorInterface("shortDescription", "singleLine", {});
  blog.changeEditorInterface("text", "markdown", {});
  blog.changeEditorInterface("picture", "assetLinkEditor", {});
  const sitePageNew = migration
    .createContentType("sitePageNew")
    .name("Site Page - New")
    .description("")
    .displayField("title");

  sitePageNew
    .createField("title")
    .name("Title")
    .type("Symbol")
    .localized(false)
    .required(true)
    .validations([
      {
        unique: true
      }
    ])
    .disabled(false)
    .omitted(false);

  sitePageNew
    .createField("pageBody")
    .name("Page Body")
    .type("RichText")
    .localized(false)
    .required(true)
    .validations([
      {
        nodes: {}
      }
    ])
    .disabled(false)
    .omitted(false);

  sitePageNew.changeEditorInterface("title", "singleLine", {});
  sitePageNew.changeEditorInterface("pageBody", "richTextEditor", {});
  const mute = migration
    .createContentType("mute")
    .name("Mute")
    .description("")
    .displayField("screenName");

  mute
    .createField("screenName")
    .name("Screen Name")
    .type("Symbol")
    .localized(false)
    .required(true)
    .validations([
      {
        unique: true
      },
      {
        size: {
          min: null,
          max: 15
        }
      }
    ])
    .disabled(false)
    .omitted(false);

  mute
    .createField("muteOn")
    .name("Mute On")
    .type("Date")
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);
  mute
    .createField("muteOff")
    .name("Mute Off")
    .type("Date")
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);

  mute
    .createField("reoccuring")
    .name("Reoccuring")
    .type("Symbol")
    .localized(false)
    .required(true)
    .validations([
      {
        in: ["not", "daily", "monthly", "weekly"]
      }
    ])
    .disabled(false)
    .omitted(false);

  mute
    .createField("past")
    .name("Past")
    .type("Boolean")
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);
  mute.changeEditorInterface("screenName", "singleLine", {});

  mute.changeEditorInterface("muteOn", "datePicker", {
    ampm: "24",
    format: "timeZ"
  });

  mute.changeEditorInterface("muteOff", "datePicker", {
    ampm: "24",
    format: "timeZ"
  });

  mute.changeEditorInterface("reoccuring", "dropdown", {});

  mute.changeEditorInterface("past", "boolean", {
    trueLabel: "Yes"
  });

  const sitePage = migration
    .createContentType("sitePage")
    .name("Site Page")
    .description("")
    .displayField("title");

  sitePage
    .createField("title")
    .name("Title")
    .type("Symbol")
    .localized(false)
    .required(true)
    .validations([
      {
        unique: true
      }
    ])
    .disabled(false)
    .omitted(false);

  sitePage
    .createField("headline")
    .name("Headline")
    .type("Symbol")
    .localized(false)
    .required(true)
    .validations([
      {
        unique: true
      }
    ])
    .disabled(false)
    .omitted(false);

  sitePage
    .createField("components")
    .name("components")
    .type("Array")
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false)
    .items({
      type: "Link",

      validations: [
        {
          linkContentType: ["staticPageComponent"]
        }
      ],

      linkType: "Entry"
    });

  sitePage
    .createField("image")
    .name("image")
    .type("Link")
    .localized(false)
    .required(false)
    .validations([
      {
        linkMimetypeGroup: ["image"]
      }
    ])
    .disabled(false)
    .omitted(false)
    .linkType("Asset");

  sitePage.changeEditorInterface("title", "singleLine", {});
  sitePage.changeEditorInterface("headline", "singleLine", {});

  sitePage.changeEditorInterface("components", "entryLinksEditor", {
    helpText: "Select the components that will make up this page",
    bulkEditing: false
  });

  sitePage.changeEditorInterface("image", "assetLinkEditor", {});
  const staticPageComponent = migration
    .createContentType("staticPageComponent")
    .name("Static Page Component")
    .description("")
    .displayField("headline");
  staticPageComponent
    .createField("headline")
    .name("Headline")
    .type("Symbol")
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);
  staticPageComponent
    .createField("text")
    .name("text")
    .type("Text")
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);
  staticPageComponent.changeEditorInterface("headline", "singleLine", {});
  staticPageComponent.changeEditorInterface("text", "markdown", {});
};
