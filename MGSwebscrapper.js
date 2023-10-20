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
      contadorTd = 1; // Inicia a contagem a partir do primeiro <td> após "9"
    } else if (encontrouNove) {
      contadorTd++;

      if (contadorTd === 2) {
        conteudosTD.push(textoTd);  
          
      }else if(contadorTd === 4){
        conteudosTD.push(textoTd);
        break; // Encontrou o sexto <td> após "9", então saia do loop
      }
      
    }
  }

  for (const td of elementosTd) {
    const textoTd = await page.evaluate(element => element.textContent.trim(), td);

    if (textoTd === '1') {
      encontrouNove = true;
      contadorTd = 1; // Inicia a contagem a partir do primeiro <td> após "1"
    } else if (encontrouNove) {
      contadorTd++;

      if (contadorTd === 2) {
        conteudosTD2.push(textoTd);  
          
      }else if(contadorTd === 4){
        conteudosTD2.push(textoTd);
        break; // Encontrou o sexto <td> após "9", então saia do loop
      }
      
    }
  }
  
  if (encontrouNove) {
    if(conteudosTD[1] === 'Em aberto'){
      console.log("Ainda não foi chamado!");
    }
    console.log('Conteúdo do sexto <td> após "9":', conteudosTD[0], conteudosTD[1], conteudosTD2[0], conteudosTD2[1]);
  } else {
    console.log('O valor "9" não foi encontrado na página.');
  }

  await browser.close();

  //console.log('teste');
  //console.log(tdComValorNove);

})();

