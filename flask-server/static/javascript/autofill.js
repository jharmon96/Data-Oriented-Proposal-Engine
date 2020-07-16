//var submitted = '{{submitted}}';

//document.body.onload = addElement();
//window.onload = addElement();

//        <script>
//             console.log(
//             var money = document.getElementById('contract_value' + {{contract.contract_value}}).value;
//             money = formatMoney(money);
//             document.getElementById('contract_value').value = money;
//         </script>

function myFunc(vars) {
  return vars
}

function formatMoney(number) {
  return number.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}

function addElement (submitted) { 
  // create a new div element 
  var newNode = document.createElement("span"); 
  // add the newly created element and its content into the DOM 
  var parentDiv = document.getElementById("childElement").parentNode; 
  
  var sp2 = document.getElementById("childElement");
  parentDiv.insertBefore(newNode, sp2);

  // and give it some content 
  var newContent = document.createTextNode(submitted);

  // add the text node to the newly created div
  newNode.appendChild(newContent);  

}

function assign(set_aside, psc_filter) {
    
    document.getElementById('set_aside').value = set_aside;
    document.getElementById('psc_filter').value = psc_filter;
}

function submit ()
{
  if (submitted)
  {
    addElement();
  }
}

function autofill()
{
  if (document.getElementById('autofill').checked) 
  {
      document.getElementById('contractType').value = Math.floor((Math.random() * 999999) + 1);
  }  
}