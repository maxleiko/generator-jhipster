/**
 * Copyright 2013-2017 the original author or authors from the JHipster project.
 *
 * This file is part of the JHipster project, see http://www.jhipster.tech/
 * for more information.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const util = require('util');
const chalk = require('chalk');
const generator = require('yeoman-generator');
const prompts = require('./prompts');
const BaseGenerator = require('../generator-base');

const PipelineGenerator = generator.extend({});

util.inherits(PipelineGenerator, BaseGenerator);

const constants = require('../generator-constants');

module.exports = PipelineGenerator.extend({
    constructor: function (...args) { // eslint-disable-line object-shorthand
        generator.apply(this, args);
    },

    initializing: {
        sayHello() {
            this.log(chalk.white('[Beta] Welcome to the JHipster CI/CD Sub-Generator'));
        },
        getConfig() {
            this.baseName = this.config.get('baseName');
            this.applicationType = this.config.get('applicationType');
            this.skipClient = this.config.get('skipClient');
            this.clientPackageManager = this.config.get('clientPackageManager');
            this.buildTool = this.config.get('buildTool');
            this.herokuAppName = this.config.get('herokuAppName');
            this.clientFramework = this.config.get('clientFramework');
            this.testFrameworks = this.config.get('testFrameworks');
            this.abort = false;
        },
        initConstants() {
            this.NODE_VERSION = constants.NODE_VERSION;
            this.YARN_VERSION = constants.YARN_VERSION;
            this.NPM_VERSION = constants.NPM_VERSION;
        },
        getConstants() {
            this.DOCKER_DIR = constants.DOCKER_DIR;
            this.SERVER_MAIN_RES_DIR = constants.SERVER_MAIN_RES_DIR;
            this.DOCKER_JENKINS = constants.DOCKER_JENKINS;
        }
    },

    prompting: {
        askPipelines: prompts.askPipelines,
        askIntegrations: prompts.askIntegrations
    },
    configuring: {
        setTemplateconstiables() {
            if (this.abort || this.jenkinsIntegrations === undefined) return;
            this.gitLabIndent = this.jenkinsIntegrations.includes('gitlab') ? '    ' : '';
            this.indent = this.jenkinsIntegrations.includes('docker') ? '    ' : '';
            this.indent += this.gitLabIndent;
        }
    },

});
