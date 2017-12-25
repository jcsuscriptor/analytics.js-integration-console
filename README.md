
2. Ignorar archivos en el Git

   Agregar archivo .gitignore, para aplicaciones Node. 
   
   Referencias de gitignore para Node
   https://github.com/github/gitignore/blob/master/Node.gitignore


3. Dependencias
   
   
   npm install @segment/analytics.js-core   --save
   npm install  @segment/analytics.js-integration --save
   npm install  @segment/send-json --save
   npm install is --save
   npm install @segment/to-iso-string --save
   npm install @ndhoule/extend --save

4. Dependencias Desarrollo

   npm install  browserify --save-dev
    

4. Use (Example)

   Example a:  Consumir analytics.js-console 
  
   Ejecutar commando para generar javascript para navegador:

   > browserify example\build.integrationConsole.js -o build\bundle.integrationConsole.js

   Visualizar archivo example/integrationConsole.html (Desde un servidor Web)

   
   Example b: Consumir analytics.js-logz.js

   Ejecutar commando para generar javascript para navegador:

   > browserify example\build.logz.js -o build\bundle.integrationLogz.js

   Visualizar archivo example/integrationLogz.html (Desde un servidor Web)
