/*
 * This file is only directly used in development and tests.
 * In production is it overwritten by the build process.
 */

import { getTemplatePath } from "./templates";

/* eslint-disable-next-line @typescript-eslint/no-var-requires */
const moduleManifest = require(`./${getTemplatePath()}/moduleManifest`).default;

const sendMail = moduleManifest.sendMail;
const previews: { [key: string]: any } = moduleManifest.previews;
const templates: { [key: string]: any } = moduleManifest.templates;
const config: { [key: string]: any } = moduleManifest.config;

const manifest = { sendMail, config, templates, previews };
export { sendMail, config, templates, previews };
export default manifest;
