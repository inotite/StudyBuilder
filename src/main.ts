import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment, Environment } from './environments/environment';
import { environmentLoader } from './environments/environment-loader';
import 'hammerjs';

environmentLoader.then((env: Environment) => {
   if (env.production) {
      enableProdMode();
   }

   environment.name = env.name;
   environment.production = env.production;
   environment.settings = env.settings;
});

platformBrowserDynamic()
   .bootstrapModule(AppModule)
   .catch(err => console.error(err));
