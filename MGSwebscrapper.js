const puppeteer = require('puppeteer');


(async () => {
  // ... Seu código Puppeteer para extrair os dados ...
  const browser = await puppeteer.launch({
    headless: 'new',
  });
  const page = await browser.newPage();

  const mainUrl = 'https://www.mgs.srv.br/processo-seletivo-convocacao/info/processo-seletivo-publico-simplificado-2-2023/77';
  
  await page.goto(mainUrl);

  // Aguarda a página carregar
  await page.waitForSelector('select[name="ddl_cdCargo"]');

  const elementoSelect = await page.$('select[name="ddl_cdCargo"]');
  await elementoSelect.select('557');

  // Aguarde um momento para que a seleção seja processada (se necessário)
  await page.waitForTimeout(3000);
  
  const cidadeSelect = await page.$('select[name="ddl_cdLocalidade"]');
  await cidadeSelect.select('613');

  await page.waitForTimeout(2000);

  await page.click('input[name="bt_localizar"]');

  await page.waitForTimeout(2000);

  const elementosTd = await page.$$('td');

  let encontrouNove = false;
  let contadorTd = 0;
  let conteudoSextoTd;
  var conteudosTD = [];
  var conteudosTD2 = [];

  for (const td of elementosTd) {
    const textoTd = await page.evaluate(element => element.textContent.trim(), td);

    if (textoTd === '9') {
      encontrouNove = true;
      contadorTd = 1; 
    } else if (encontrouNove) {
      contadorTd++;

      if (contadorTd === 2) {
        conteudosTD.push(textoTd);  
          
      }else if(contadorTd === 4){
        conteudosTD.push(textoTd);
        break; 
      }
      
    }
  }

  for (const td of elementosTd) {
    const textoTd = await page.evaluate(element => element.textContent.trim(), td);

    if (textoTd === '1') {
      encontrouNove = true;
      contadorTd = 1; 
    } else if (encontrouNove) {
      contadorTd++;

      if (contadorTd === 2) {
        conteudosTD2.push(textoTd);  
          
      }else if(contadorTd === 4){
        conteudosTD2.push(textoTd);
        break; 
      }
      
    }
  }
  
  if (encontrouNove) {
    
    if(conteudosTD2[1] === 'Em aberto'){
      console.log("O primeiro candidato "+ conteudosTD2[0] +" ainda não foi chamado!");
    }else{
      console.log("O primeiro candidato foi chamado!");
    }
    
    if(conteudosTD[1] === 'Em aberto'){
      console.log("Eu (" + conteudosTD[0] + ") ainda não fui chamado!");
    }else{
      console.log("Parabéns "+ conteudosTD[0]+ "! Fui chamado!");
    }
    
  } else {
    console.log('O TD requerido não foi encontrado na página.');
  }

  await browser.close();
/*
  res.write('<!DOCTYPE html>'+
            '<html>'+
            '    <head>'+
            '        <meta charset="utf-8" />'+
            '        <title>Node.js tests</title>'+
            '    </head>'+ 
            '    <body>'+
            `       <p id = "name">Hello ${conteudosTD[0]}</p>`+
            '    </body>'+
            '</html>');
*/
  //console.log('teste');
  //console.log(tdComValorNove);

})();

