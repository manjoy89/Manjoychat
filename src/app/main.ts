import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { ViewChild } from '@angular/core/src/metadata/di';
import { AngularFireAuth } from 'angularfire2/auth';

import { AppModule } from './app.module';

platformBrowserDynamic().bootstrapModule(AppModule);
