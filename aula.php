<?php

function par_or_impar($a){
   $impar_or_par = "";
   if ($a%2==1){
    $impar_or_par = $a . " é um numero impar";
   }
   if ($a%2==0 or $a%2==2){
    $impar_or_par = $a . " é um numero par";
   }
   
   echo $impar_or_par;
}



par_or_impar(5);