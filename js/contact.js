const boton = document.getElementById('btn')
boton.addEventListener('click', message)

    function message(){
      let name = document.getElementById('form-name').value;
      let mail = document.getElementById('form-mail').value;
      let mensaje = document.getElementById('form-message1').value;
      alert('name'+' ' +name + 'mail' +' '+ mail + 'mensaje' + '' +mensaje)

       }