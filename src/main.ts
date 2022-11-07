//  точка входа. тут создается экземпляр приложения
import 'reflect-metadata';
import RESTApplication from './app/rest-app.js';
import { appContainer } from './app/app-container.js';
import { Component } from './app/app-component.js';

const RESTApp = appContainer.get<RESTApplication>(Component.RESTApplication);

RESTApp.init();

