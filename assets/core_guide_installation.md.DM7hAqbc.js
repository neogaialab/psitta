import{_ as t,E as n,c as o,m as e,a,J as l,a2 as i,o as r}from"./chunks/framework.CmNvrHOf.js";const C=JSON.parse('{"title":"Installation","description":"","frontmatter":{},"headers":[],"relativePath":"core/guide/installation.md","filePath":"core/guide/installation.md"}'),p={name:"core/guide/installation.md"},h=i('<h1 id="installation" tabindex="-1">Installation <a class="header-anchor" href="#installation" aria-label="Permalink to &quot;Installation {#installation}&quot;">​</a></h1><div class="warning custom-block"><p class="custom-block-title">WARNING</p><p>We recommend scaffolding your project with your favorite web framework before installing Psitta, followed by integrating it with a Web framework for a seamless experience.</p></div><div class="tip custom-block"><p class="custom-block-title">NOTE</p><p>Psitta is an ESM-only package. Don&#39;t use <code>require()</code> to import it, and make sure your nearest <code>package.json</code> contains <code>&quot;type&quot;: &quot;module&quot;</code>, or change the file extension of your relevant files to <code>.mjs/.mts</code>. Refer to Vite&#39;s troubleshooting guide for more details. Also, inside async CJS contexts, you can use <code>await import(&#39;@psitta/core&#39;)</code> instead.</p></div><div class="info custom-block"><p class="custom-block-title">Prerequisites</p><p>Ensure that you have the following prerequisites:</p><ul><li><a href="https://nodejs.org/en/download/" target="_blank" rel="noreferrer">Node.js</a> installed on your development environment</li><li>Your preferred IDE (<a href="https://code.visualstudio.com/" target="_blank" rel="noreferrer">Visual Studio Code</a> is recommended)</li></ul></div><h2 id="official-integration" tabindex="-1">Official Web Framework Integration <a class="header-anchor" href="#official-integration" aria-label="Permalink to &quot;Official Web Framework Integration {#official-integration}&quot;">​</a></h2><p>Psitta provides official integrations for <a href="https://vuejs.org" target="_blank" rel="noreferrer">Vue</a> and <a href="https://react.dev" target="_blank" rel="noreferrer">React</a>. These integrations offer features such as locale state management, a versatile component for localizing content with slots, hooks/composables for easy localization, and more.</p><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-4383_" id="tab-Q6AkcKf" checked="checked"><label for="tab-Q6AkcKf">pnpm</label><input type="radio" name="group-4383_" id="tab-mfQFais"><label for="tab-mfQFais">npm</label><input type="radio" name="group-4383_" id="tab-Pqz_rwp"><label for="tab-Pqz_rwp">yarn</label><input type="radio" name="group-4383_" id="tab-NsIHsTt"><label for="tab-NsIHsTt">bun</label></div><div class="blocks"><div class="language-sh vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  $</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> pnpm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> add</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> @psitta/core</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> @psitta/{framework}</span></span></code></pre></div><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  $</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> npm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> @psitta/core</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> @psitta/{framework}</span></span></code></pre></div><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  $</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> yarn</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> add</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> @psitta/core</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> @psitta/{framework}</span></span></code></pre></div><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  $</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> bun</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> @psitta/core</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> @psitta/{framework}</span></span></code></pre></div></div></div><p>After installation, proceed to the <a href="/psitta/core/guide/configuration.html">Configure Guide</a> to set up Psitta for your project.</p>',8),c={id:"your-own-integration",tabindex:"-1"},d=e("a",{class:"header-anchor",href:"#your-own-integration","aria-label":'Permalink to "Your Own Integration <Badge type="danger" text="advanced" /> {#your-own-integration}"'},"​",-1),k=i('<p>If you prefer manual setup or are not using a Web framework, you can install Psitta directly in your project using one of the following package managers:</p><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-ZupeH" id="tab-2WaepsI" checked="checked"><label for="tab-2WaepsI">pnpm</label><input type="radio" name="group-ZupeH" id="tab-YoPu7li"><label for="tab-YoPu7li">npm</label><input type="radio" name="group-ZupeH" id="tab-w60gpzL"><label for="tab-w60gpzL">yarn</label><input type="radio" name="group-ZupeH" id="tab-aexAs-F"><label for="tab-aexAs-F">bun</label></div><div class="blocks"><div class="language-sh vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  $</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> pnpm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> @psitta/core</span></span></code></pre></div><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  $</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> npm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> @psitta/core</span></span></code></pre></div><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  $</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> yarn</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> @psitta/core</span></span></code></pre></div><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  $</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> bun</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> @psitta/core</span></span></code></pre></div></div></div><p>After installing Psitta Core, you can implement locale state management, localization functions, locale detection, and more according to your project&#39;s needs. Psitta Core includes utilities for implementing i18n. Here are some useful reference links for implementing your integration:</p><ul><li><a href="/psitta/core/reference/localization.html">Localization API Reference</a>: Contains utilities for localizing messages or URLs.</li><li><a href="/psitta/core/reference/detection.html">Detection API Reference</a>: Provides utilities for detecting the user&#39;s locale.</li><li><a href="/psitta/core/reference/format.html">Format API Reference</a>: API for formatting strings or segments. It also includes a reference for interpolation and declension.</li><li><a href="/psitta/core/reference/library.html">Library Reference</a>: Details of other integration implementations and their usage, which can serve as a base for your integration.</li></ul>',4);function g(u,m,F,f,b,y){const s=n("Badge");return r(),o("div",null,[h,e("h2",c,[a("Your Own Integration "),l(s,{type:"danger",text:"advanced"}),a(),d]),k])}const _=t(p,[["render",g]]);export{C as __pageData,_ as default};
