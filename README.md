# Asterics-AAC-Data
This repository holds configurations used by [Asterics AAC](https://github.com/asterics/Asterics-AAC). Data from the `main` branch is made available via [GitHub pages](https://asterics.github.io/Asterics-AAC-Boards/live_metadata.json), which is used by the app to download configurations.

These are the most important files and folders of this repository:
* `boards`: contains single boards about specific topics
* `communicators`: contains self-contained communicators (shown by default on the import page for new users in Asterics AAC)
* `predefined_mappings`: contains information about [Predefined actions](https://github.com/asterics/Asterics-AAC/blob/master/docs/documentation_user/05_actions.md#predefined-actions) and predefined requests used for [Live elements](https://github.com/asterics/Asterics-AAC/blob/master/docs/documentation_user/11_live_elements.md#action-result---predefined-action)
* `live_metadata.json`: contains metadata about all `boards` and `communicators`, used by Asterics AAC to retrieve metadata about all existing configurations. The file `live_metadata_beta.json` contains the same content but is used by Asterics AAC "latest" and "beta" releases.
* `live_predefined_actions.json`: contains metadata about all predefined actions stored in folder `predefined_mappings/actions`, which is used by Asterics AAC. The file `live_predefined_actions_beta.json` contains the same content but is used by Asterics AAC "latest" and "beta" releases.
* `live_predefined_requests.json`: contains metadata about all predefined requests stored in folder `predefined_mappings/requests`, which is used by Asterics AAC. The file `live_predefined_requests_beta.json` contains the same content but is used by Asterics AAC "latest" and "beta" releases.

# Board sets

This section section describes everything related to board sets located in `boards` and `communicators`.

## Adding and altering configurations
The following sections describe step-by-step how to add or alter board configurations from this repository in order to use them in Asterics AAC afterwards.

In general most changes require to run `npm run generate` after the changes have been applied. If you're editing the files locally and know how to run it, please do it before creating a pull request. If you're editing files directly on GitHub and creating a pull request, a maintainer of this repository will run it for you. Before running `npm run generate` the first time, you need to run `npm install`. To only generate files for "beta" and "latest" releases, run `npm run generate-beta`.

### Change metadata (description) of existing configurations
1. find the folder containing the configuration in [boards](https://github.com/asterics/Asterics-AAC-Boards/tree/main/boards) or [communicators](https://github.com/asterics/Asterics-AAC-Boards/tree/main/communicators). You can also go to the import page in Asterics AAC, show the details of the configuration and click on "Edit on GitHub" to find the folder.
2. edit `info.json` updating the metadata in a separate branch / fork (you can directly use the "edit" button in GitHub to do this).
3. Commit changes and create a pull request in order to let others confirm your changes.

### Change screenshots of existing configurations
1. find the folder containing the configuration in [boards](https://github.com/asterics/Asterics-AAC-Boards/tree/main/boards) or [communicators](https://github.com/asterics/Asterics-AAC-Boards/tree/main/communicators). You can also go to the import page in Asterics AAC, show the details of the configuration and click on "Edit on GitHub" to find the folder.
2. edit / add the screenshots in the folder. File format `.jpg` and resolution of `1920x1080px` is recommended.
3. Run `npm run generate` in order to generate the updated `thumbnail.jpg` out of the first screenshot.
4. Commit changes and create a pull request in order to let others confirm your changes.

### Update the contents of the boards of existing configuration
1. Import the configuration you want to change to a new offline user in Asterics AAC.
2. Update the boards as needed within Asterics AAC. Be sure to not change more than needed.
3. Go to `Manage grids -> more -> Save backup to file`
4. find the folder containing the configuration in [boards](https://github.com/asterics/Asterics-AAC-Boards/tree/main/boards) or [communicators](https://github.com/asterics/Asterics-AAC-Boards/tree/main/communicators). You can also go to the import page in Asterics AAC, show the details of the configuration and click on "Edit on GitHub" to find the folder.
5. replace the existing file `.grd.json` in this folder with the `.grd` backup file from step (3). You can rename it to `.grd.json`, but don't have to, it's done automatically.
6. Commit changes and create a pull request in order to let others confirm your changes.

### Create a new configuration
1. Create the new configuration within Asterics AAC.
2. Go to `Manage grids -> more -> Save backup to file`
3. Decide the target folder for the new configuration in this repository. Configurations containing single boards (e.g. boards for a specific topic like "football") belong to the folder [boards](https://github.com/asterics/Asterics-AAC-Boards/tree/main/boards), while complete self-contained configurations (e.g. a full communicator) belong to the folder [communicators](https://github.com/asterics/Asterics-AAC-Boards/tree/main/communicators).
4. Create a new subfolder in "boards" or "communicators". The name of the folder is not important but should make it clear which kind of configuration it holds. For instance boards about the UEFA Euro 2024 by John Doe should go to a folder like `boards/UEFA Euro 2024 - John Doe`.
5. Move the backup from (2) to this folder.
6. Create a file `info.json` containing metadata about the boards. See [Content of info.json](#content-of-infojson) below for possible content of this file.
7. Create screenshots of the configuration (e.g. `1.jpg`, `2.jpg` etc.) and add them to the folder. File format `.jpg` and resolution of `1920x1080px` is recommended. The first image (alphabetic order) will be copied to a lower resolution `thumbnail.jpg` used for an overview of configurations.
8. Commit changes and create a pull request in order to let others confirm your changes.

### Add new language to multilingual configuration
See [docs about difference between multilingual and monolingual configurations](https://github.com/asterics/Asterics-AAC/blob/master/docs/documentation_user/09_translation.md#translation-of-the-content).

Follow steps of [Update the contents of the boards of existing configuration](#update-the-contents-of-the-boards-of-existing-configuration) where step (2) is translating the configuration to a new language. For docs about how to add a translation see [Translation of a multilingual default gridset](https://github.com/asterics/Asterics-AAC/blob/master/docs/documentation_user/09_translation.md#translation-of-a-multilingual-default-gridset) in the docs.

### Add translated version of monolingual configuration
See [docs about difference between multilingual and monolingual configurations](https://github.com/asterics/Asterics-AAC/blob/master/docs/documentation_user/09_translation.md#translation-of-the-content).

Follow these steps:
1. Import the configuration you want to translate to a new offline user in Asterics AAC.
2. Follow the [instructions how to translate the monolingual configuration from the docs](https://github.com/asterics/Asterics-AAC/blob/master/docs/documentation_user/09_translation.md#creation-of-a-new-monolingual-default-gridset)
3. find the folder containing the configuration in [boards](https://github.com/asterics/Asterics-AAC-Boards/tree/main/boards) or [communicators](https://github.com/asterics/Asterics-AAC-Boards/tree/main/communicators). You can also go to the import page in Asterics AAC, show the details of the configuration and click on "Edit on GitHub" to find the folder.
4. add a new subfolder with the 2-digit language code of your newly translated language, e.g. `en` if you translated the configuration to English.
5. Add the backup `.grd` file resulting from (2) to the new folder (e.g. `en`).
6. Optionally add a file `info.json` or screenshots of the configuration to the new folder (e.g. `en`). These files override data from the parent folder.
7. Commit changes and create a pull request in order to let others confirm your changes.

## General folder format
The contents of the subfolders of `boards` and `communicators` are managed in the same way. The name of subfolders is not important. They (may) contain:
* `info.json`: information about the configuration
* `*.img, *.png`: screenshots of the configuration (resolution should be `1920x1080`). The special image `thumbnail.jpg` is automatically created from the first screenshot (alphabetic order) with a width of `500px`. It's used by Asterics AAC for the preview miniature on the import page.
* `*.grd.json`: Asterics AAC backup file containing the actual configuration (`*.grd` files are automatically renamed to `*.grd.json` - causes use of gzip compression by GitHub pages)
* folders like `en`, `de`, `es` contain translated versions of this configuration. These folders contain an own `.grd.json` backup file and may contain additional images (`.png, .jpg`) or an additional `info.json` which overwrite information from the base folder.

### Example configuration
Look at [boards/Hora de la ducha](https://github.com/asterics/Asterics-AAC-Boards/tree/main/boards/Hora%20de%20la%20ducha) for an example. It contains:
* folders `en`, `es`, `it`, `pt`: containing `.grd.json` files representing the backup files containing the content, translated to different languages
* `info.json`: contains metadata shared by all translated configurations of "Hora de la ducha"
* `.jpg files`: full-size screenshots shown in details modal, `thumbnail.jpg` for preview in grid view

## Content of info.json
The file info.json may contain the following properties in JSON format:
* `name`: the name of the configuration
* `author`: the author of the configuration
* `website`: optional URL for more information about the author
* `languages`: an array of 2-digit codes of languages of this configuration, e.g. `["en", "de", "es"]`.
* `description`: a short description of the configuration
* `priority`: optional integer value, where a higher value means higher priority and will cause the result be listed first in Asterics AAC.
* `wordPrediction`: optional boolean property to indicate that the configuration contains a keyboard with word prediction. This can be used in order to ask the user if they want to import a dictionary after importing.
* `tags`: an array of tags, indicating the properties of the configuration (e.g. topic and grid size, example: `["BASIC", "4x5", "MEDICAL"]`)
* `generateGlobalGrid`: if `true` a default global grid is generated while importing this configuration

# Predefined actions

The folder `predefined_mappings/actions` contains metadata about [Predefined actions](https://github.com/asterics/Asterics-AAC/blob/master/docs/documentation_user/05_actions.md#predefined-actions) which make the configuration of complex actions (e.g. HTTP requests to an API) more user-friendly. Each subfolder of `predefined_mappings/actions` contains information about a specific device, or more general an `action group`. All data from these folders is merged to `live_predefined_actions.json` for the use within Asterics AAC.

## Structure of a predefined action

This is the JSON structure of a predefined action group, located in a subfolder of `predefined_mappings/actions`:
* `id`: a unique ID of the device or action group, e.g. a specific device with a specific API version like `Shelly_Plus_Plug_S_Gen1_HTTP_API`
* `name`: the display name for this action group 
* `actions`: an array of actions possible for this action group. Each action has these properties:
   * `name`: a name for the action, can be translated (see below) 
   * `actionModelName`: the model name of an action which should be executed in the background, for most actions integrating REST APIs this will be `GridActionHTTP`. See all models with prefix `GridAction` in [folder model of Asterics AAC](https://github.com/asterics/Asterics-AAC/tree/master/src/js/model).
   * `customValues`: an array of custom values, which can be defined by the user in the UI. A custom value has these properties:
      * `name`: the name of the custom value, shown to the user, can be translated (see below)
      * `type`:  the type of the custom value, can be `text`, `number` or `select`
      * `values`: only for type `select`. Contains an array of the selectable values. Can be either (translatable) strings which are directly used for the resulting background action or objects with these properties:
         * `label`: translatable string shown to the user
         * `value`: value actually used for the background action
      * `placeholder` (optional, only for type `text` and `number`): a placeholder shown in the UI
      * `min`, `max` and `step` (optional, only for type `number`): minimum, maximum and step values for the number input
      * `autoStartWith` (optional, only for type `text`): array of string values the `text` value must start with. The string given by the user is auto-prefixed with first value of the array. So if `autoStartWith` is `["http://", "https://"]` and the user inputs `192.168.0.10`, this value is automatically changed to `http://192.168.0.10` while if the user inputs `https://192.168.0.10` it's also accepted and not changed.
      * `mustMatch` (optional, only for type `text`): a Javascript regex the string given by the user must match 
  * `presets`: preset values which should be set to the properties of the given `actionModelName`. For instance for `GridActionHTTP` there could be the preset `{"method": "POST"}` to specify that a POST request should be used (without any user input). It's also possible to use placeholders in the form of [Javascript template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals), for instance there could be the preset value `"restUrl": "${httpUrl}/somePath/0?action=${actionType}"` where `${httpUrl}` and `{actionType}` will be replaced by the `customValues` with the names `httpUrl` and `actionType`, defined above and specified by the user via the UI.

# Predefined requests
The folder `predefined_mappings/requests` contains information about predefined requests used for getting data for [Live elements](https://github.com/asterics/Asterics-AAC/blob/master/docs/documentation_user/11_live_elements.md). The data format is the same as for predefined actions, but also containing some more information about how to extract data from the action results for being displayed. Therefore each `action` in the configuration can have a property `extract` with the following data:
* `mode`: the mode how to extract data, can be one of the values from [GridElementLive.EXTRACT_MODES](https://github.com/asterics/Asterics-AAC/blob/8b5da575685799248ef75bb1c3d2663138c12df8/src/js/model/GridElementLive.js#L45)
* `extractInfos`: array of possible values selectable by the user, each one with the following properties:
   * `name`: translatable name shown to the user as label to select, see [docs about selecting "Value to display"](https://github.com/asterics/Asterics-AAC/blob/master/docs/documentation_user/11_live_elements.md#action-result---predefined-action)
   * `selector`: CSS or JSON selector for extracting the value from the response, see [docs explaining the selectors](https://github.com/asterics/Asterics-AAC/blob/master/docs/documentation_user/11_live_elements.md#action-result---http-action)
   * `mappings`: optional mapping of result values to (translatable) display values. e.g. the mapping `{"true": "on"}` maps a `true` result to the string "on", which then can be translated - see below.

# Translations of predefined mappings

The `name` properties of the JSON defining a predefined action group and other translatable values (see above) can be translated via crowdin. Each run of `npm run generate` automatically generates the file `predefined_mappings/i18n/i18n.en.json` which then must be manually translated to the English values. Afterwards they can be translated into other languages in this [crowdin project](https://crowdin.com/project/asterics-grid-boards).

# Acknowledgements
This repository was created within the [netidee project funding for Asterics AAC](https://www.netidee.at/asterics-grid), Call 18.

<img src="https://raw.githubusercontent.com/asterics/Asterics-AAC-Boards/refs/heads/main/netidee-logo.svg" width="250"/>

Thanks to [crowdin](https://crowdin.com/project/asterics-grid-boards) for providing a free open source license.

# License

All source code in this repository is licensed under the [AGPL-3.0](./LICENSE). All other information like documentation and communication grids are licensed under the [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/deed.en). If another license is mentioned in `info.json` of a communication grid set, this license applies.
