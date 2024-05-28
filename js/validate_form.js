function Validate_Form() {

    var almsj = "No se completron los campos de: ";

    if (!document.consulta.Nombre.value)
        almsj += " Nombre";
    if (!document.consulta.Apellido.value)
        almsj += " Apellido";
    if (!document.consulta.Mail.value)
        almsj += " Mail";
    if (!(document.consulta.Queja.checked || document.consulta.Consulta.checked || (document.consulta.Otro.checked && document.consulta.Otro_Texto.value)))
        almsj += " Motivo";
    if (!document.consulta.Mensaje.value)
        almsj += " Mensaje";

    if (almsj != "No se completron los campos de") {
        alert(almsj);
        return false;
    }
}