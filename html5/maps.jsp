<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="UTF-8" isELIgnored ="false"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ page import="java.util.*" %>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c" %>
<%@ taglib prefix="snk" uri="/WEB-INF/tld/sankhyaUtil.tld" %>
  
  
  <!–
	Criação: 01/04/2019
	Responsavel: Daniel Araujo
	Funcionalidade: Foi utilizado a biblioteca Leaflet - (software livre)
	Objetivo: Realizar o mapeamento de talhões, para facilitar a visualização dos mesmos.
  ->

<html>
   <head>
      <title>Maps</title>
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	  <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link rel="stylesheet" href="${BASE_FOLDER}/css/leaflet.css"/>
      <link rel="stylesheet" href="${BASE_FOLDER}/css/style.css"/>
      <snk:load/>
   </head>
   <body onload="init()">
		<div id='map'></div>
   </body>
   <script src="${BASE_FOLDER}/js/criador_json.js" type="text/javascript"></script>
   <script src="${BASE_FOLDER}/js/leaflet.js"></script>
   <script src="${BASE_FOLDER}/js/script_leaflet.js"></script>
</html>