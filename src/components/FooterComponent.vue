<template>
  <div class="footer_c wow animate__animated animate__fadeIn">
    <img id="flores" src="flores_footer.png" alt="">
    <div class="contact_us_c">
      <img src="LOGO FOOTER.png" alt="">
      <p id="contactanos">Contactanos:</p>
      <p id="telefono"><i class="fa-solid fa-phone"></i> 3329-631587</p>
      <p id="mail"><i class="fa-regular fa-envelope"></i> almalibre@gmail.com</p>
      <p id="map"><i class="fa-solid fa-location-dot"></i> Retira tu compra en: 
      Esquiu 350. 
      San Pedro 
      Pv. Buenos Aires.</p>
    </div> 
    <div class="social_c">
      <p id="seguinos">Seguinos en nuestras redes</p>
      <div class="social_icons">
        <i class="fa-brands fa-facebook"></i>
        <i class="fa-brands fa-instagram"></i>
      </div>
    </div>
    <div class="pay_mediums_c">
      <p id="seguinos">Medios de pago:</p>
      <img src="pagos.png" alt="">
    </div>
  </div>
</template>

<script setup>

</script>

<style scoped>
.footer_c {
  width: 100%;
  height: 350px;
  background-color: #39173e;
  display: flex;
  justify-content: space-around;
  align-items: center;
}


/* Contactanos */


.contact_us_c{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
#contactanos{
  font-family: "Bebas Neue", sans-serif;
  letter-spacing: 6px;
  color: white;
  font-size: 20px;
}
#telefono,#mail,#map{
  color: white;
  font-family: Arial, Helvetica, sans-serif;
  letter-spacing: 2px;
  font-size: 14px;
  text-align: center;
  margin-top: 15px!important;
}

/* Social */


.social_c{
  width: 100%;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
#seguinos{
  color: white;
  font-family: "Bebas Neue", sans-serif;
  letter-spacing: 4px;
  font-size: 22px;
  text-align: center;
}
.social_icons{
  display: flex;
  gap:20px;
  font-size: 30px;
  color: white;
}
.social_icons i{
  z-index: 2;
}
.social_icons i:hover{
  color: rgb(218, 218, 218);
  cursor: pointer;
}
/* Medios de pago */


.pay_mediums_c{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
}
#flores{
  width: 100%;
  object-fit: contain;
  position: absolute;
  display: none;
}
@media(max-width:1100px){
  .footer_c{
    flex-direction: column;
    height: 700px!important;
    gap: 20px;
  }
  .social_c{
    border: none;
  }
  .contact_us_c{
    margin-top: 40px!important;
    margin-bottom: 40px!important;
  }
}

</style>
