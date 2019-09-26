
<h1>Study Builder</h1>

  

<h2>Development Tools</h2>

<ul>

<li><a  href="https://code.visualstudio.com/">VS Code</a></li>

<li><a  href="https://git-scm.com/">Git</a></li>

<li><a  href="https://nodejs.org/en/">Node.js</a></li>

</ul>

  

<h2>Relevant description for VS Code Extensions</h2>

<ul>

<li>Angular Language Service</li>

<li>Azure Repos</li>

<li>Bracket Pair Colorizer</li>

<li>Cucumber Gherkin Full Language Support</li>

<li>Debugger for Chrome</li>

<li>npm</li>

<li>Typescript Hero</li>

</ul>

  

<h2>Git development process with PR.</h2>

<ul>

<li>create new dev folder - e.g - c:\dev and open Visual Code</li>

<li>From terminal window, run git clone (refer to team for details)</li>

<li>open the newly created folder c:\dev\YPrime.StudyBuilder</li>

<li>Switch from master to develop branch</li>

<li>Create a new branch with a relevant title => feature/{{workitem-title}}</li>

<li>The feature branch will appear in VSCode toolbar</li>

<li>run npm install</li>

<li>Optional - click debug and configure chrome debug settings - url: localhost/4200</li>

<li>run npm start to run the application</li>

<li>Make changes to the feature</li>

<li>When done,</li>

<ul>

<li>Commit the changes with the comments</li>

<ul>

<li>Detailing sub-tasks completed for Pull Request (PR)</li>

</ul>

<li>Push the branch to server</li>

</ul>

<li>Create a PR from devops, tag the work item and submit</li>

</ul>

  

<h2>Unit Test Process</h2>

<ul>

<li>Very high level Summary on Tools (Jasmine/Karma)</li>

<li>From Terminal window run npm test</li>

</ul>

  

<h2>E2E Test Process</h2>

<ul>

<li>Very high level Summary on Tools</li>

<ul>

<li><a  href="https://cucumber.io/docs/gherkin/">Gherkin</a></li>

<li><a  href="https://cucumber.io/">Cucumber</a></li>

<li><a  href="https://www.protractortest.org">Protractor</a></li>

</ul>

<li>From Terminal window run npm e2e</li>

<h3>Run tests by specified Feature Files</h3>
To only run specific features files when executing `ng e2e` update the following config setting in Protractor config: 
`specs: ['./features/**/*.feature'],`

replace `*.feature` with the name of the feature file to test. 
<h2>Debugging E2E tests</h2>

Instructions to debug e2e Protractor tests

Add a new launch.json setting to protractor config
{
"type": "node",
"request": "launch",
"name": "E2E Debug",
"program": "${workspaceRoot}/node_modules/protractor/bin/protractor",
"stopOnEntry": false,
"cwd": "${workspaceRoot}",
"protocol": "inspector",
"args": ["${workspaceRoot}/e2e/protractor.conf.js"]
}

Run the E2E Debugger, and fire the ng serve manually with command below
`run ng serve`
Set breakpoints as usual
