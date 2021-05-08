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
          "Daniel.xiao": this.$answers.author,
        });
      },
    },

    // Delete Files. Path supports glob: https://github.com/isaacs/node-glob#glob-primer
    removeFiles: ["ncgen-config.js", "src/components/base/Template.vue"],

    // Install dependencies
    installDependencies: {
      skip: false,
      tips: "Dependencies are being installed, it may take a few minutes",
      command: "npm i",
    },

    // Completion prompt message
    complete: "Congratulations, the operation is successful",
  },

  // Subcommand. Used to insert fragment module code
  sub: {
    // key is the name of the subcommand
    "add-component": {
      // Subcommand description
      description: "Add vue component",

      // Ask questions. reference: https://github.com/SBoudrias/Inquirer.js/#question
      prompt: [
        {
          type: "list",
          choices: function () {
            return api.listDirs("src/components/");
          },
          name: "category",
          message: "Please select the category",
        },
        {
          type: "input",
          name: "name",
          message: "What is the component name",
          validate(input) {
            if (!input) return "The component name is required";
            return true;
          },
        },
      ],

      // Source of project template.reference: https://github.com/daniel-dx/degit
      tmplSource: "https://github.com/daniel-dx/vue3-ncgen-demo.git",

      // Insert the specified files into the specified location
      addFilesTo: function () {
        const answers = this.$answers;
        return {
          "src/components/base/Template.vue": `src/components/${answers.category}/${answers.nameObj.upperFirstCamelCase}.vue`,
        };
      },

      // Add files directly.
      addFiles: function () {
        const answers = this.$answers;
        return {
          [`src/components/${answers.category}/${answers.nameObj.upperFirstCamelCase}.md`]: function () {
            return `# ${answers.nameObj.upperFirstCamelCase}`;
          },
        };
      },

      // Update files. Path supports glob: https://github.com/isaacs/node-glob#glob-primer
      updateFiles: function () {
        const answers = this.$answers;
        return {
          "src/App.vue": function (content, options) {
            return api.insertBefore(content, {
              "// <!-- Don't touch me - import component -->": `import ${answers.nameObj.upperFirstCamelCase} from './components/${answers.category}/${answers.nameObj.upperFirstCamelCase}.vue'`,
              "// <!-- Don't touch me - register component -->": `${answers.nameObj.upperFirstCamelCase},`,
              "<!-- Don't touch me - place component -->": `<${answers.nameObj.upperFirstCamelCase}/>`,
            });
          },
          [`src/components/${answers.category}/${answers.nameObj.upperFirstCamelCase}.vue`]: function (
            content,
            options
          ) {
            return api.replace(content, {
              Template: `${answers.nameObj.upperFirstCamelCase}`,
            });
          },
        };
      },

      // Delete Files. Path supports glob: https://github.com/isaacs/node-glob#glob-primer
      removeFiles: [],

      // Completion prompt message
      complete: "Congratulations, the operation is successful",
    },
  },
};
