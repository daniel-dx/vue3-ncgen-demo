import { api, log, _ } from "ncgen";

export default {
  // The main command. Used to generate project scaffolding
  main: {
    // Show welcome message
    welcome: "Welcome to use (Vue 3 + TypeScript + Vite) project generator",

    // Ask questions. reference: https://github.com/SBoudrias/Inquirer.js/#question
    prompt: [
      {
        type: "input",
        name: "author",
        message: "What is the author's name",
      },
    ],

    // Source of project template.reference: https://github.com/daniel-dx/degit
    tmplSource: "https://github.com/daniel-dx/vue3-ncgen-demo.git",

    // Update files. Path supports glob: https://github.com/isaacs/node-glob#glob-primer
    updateFiles: {
      "package.json": function (content, options) {
        return api.replace(content, {
          'Daniel\.xiao': this.$answers.author
        });
      },
    },

    // Delete Files. Path supports glob: https://github.com/isaacs/node-glob#glob-primer
    removeFiles: ['./ncgen-config.js'],

    // Install dependencies
    installDependencies: {
      skip: false,
      tips: "Dependencies are being installed, it may take a few minutes",
      command: "npm i"
    },

    // Completion prompt message
    complete: "Congratulations, the operation is successful"
  },

  // Subcommand. Used to insert fragment module code
  sub: {
    // key is the name of the subcommand
    "add-component": {
      // Subcommand description
      description: "",

      // Ask questions. reference: https://github.com/SBoudrias/Inquirer.js/#question
      prompt: [
        // {
        //   type: "list",
        //   choices: function () {
        //     return api.listDirs("src/");
        //   },
        //   name: "targetDir",
        //   message: "Please select the directory where the code is inserted",
        // },
      ],

      // Source of project template.reference: https://github.com/daniel-dx/degit
      tmplSource: "https://github.com/daniel-dx/vue3-ncgen-demo",

      // Insert the specified files into the specified location
      addFilesTo: {
        // "path/to/template/file": function () {
        //   return "path/to/project/file";
        // },
      },

      // Add files directly.
      addFiles: function() {
        return {
          "src/assets/test.txt": function() {
            return "some content";
          }
        };
      },

      // Update files. Path supports glob: https://github.com/isaacs/node-glob#glob-primer
      updateFiles: {
        // "path/to/files": function (content, options) {
        //   return content;
        // },
      },

      // Delete Files. Path supports glob: https://github.com/isaacs/node-glob#glob-primer
      removeFiles: [],

      // Completion prompt message
      complete: "Congratulations, the operation is successful"
    }
  }
};
