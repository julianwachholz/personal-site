/* for more entries: 
key = genkey();
plaintext = "julianw@windowslive.com";
ciphertext = byteArrayToHex(rijndaelEncrypt(plaintext,hexToByteArray(key),"ECB"));
alert("Key:"+key+"\nCipher: "+ciphertext);
// */

function hiddenText(html){
	if($("#hidden").length != 1){
		$('<div id="hidden"></div>').appendTo("body");
	}
	$("#hidden").html(html);
};

function doDecrypt(ciphertext, key) {
	return byteArrayToString(rijndaelDecrypt(hexToByteArray(ciphertext), hexToByteArray(key), "ECB"));
};

function zeigeEmail() {
	mymail = doDecrypt('f9fcc2ec4307a2f151fa045f6a5c41b8b9938fad253345a6f987281fdbc9916f','05112060282186581867815855155153');
	hiddenText('<p><img src="files/email.png" class="netwimg" alt="" /><strong>My E-Mail:</strong><br /><a href="mailto:'+mymail+'">'+mymail+'</a></p>');
	return false;
};

function zeigeMsn() {
	hiddenText('<p><img src="files/windows.png" class="netwimg" alt="" /><strong>My MSN Address:</strong><br /><a href="'+
		doDecrypt('1d091f59495f17435d4ded703c714be0c229202b305341a9d8a0d9547cff791658812f33df2879021f077f70a13d4179','95354717988225517206511883797854')+
		'">'+doDecrypt('1d3e1f8b032dc1e5b269f0056eb8ac2419479c1ed40060db382a5d51d8f20f7b','99211172321968276767482137586676')
		+'</a></p>'
	);
	return false;
};

function zeigeIcq() {
	hiddenText('<p><img src="files/icq.png" class="netwimg" alt="" /><strong>My ICQ:</strong><br /><a href="'+
		doDecrypt('486e671d3f72dc4a376606eae863edfe12068ebde8fc6622ddbea46afef7c89111f8294299b73d83537a463be447aa4c', '29119141619631945930392724598723')+
		'">'+doDecrypt('51db4bed9da630f1ecc96ca831370523','53037881063304842429877454409157')
		+'</a></p>'
	);
	return false;
};
