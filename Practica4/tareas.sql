-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 13-11-2022 a las 19:11:45
-- Versión del servidor: 10.4.22-MariaDB
-- Versión de PHP: 8.0.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `tareas`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `aw_tareas_etiquetas`
--

CREATE TABLE `aw_tareas_etiquetas` (
  `IdEtiqueta` int(11) NOT NULL,
  `texto` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `aw_tareas_etiquetas`
--

INSERT INTO `aw_tareas_etiquetas` (`IdEtiqueta`, `texto`) VALUES
(1, 'Universidad'),
(2, 'AW'),
(3, 'Personal'),
(4, 'Básico'),
(5, 'Deporte'),
(6, 'TP2');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `aw_tareas_tareas`
--

CREATE TABLE `aw_tareas_tareas` (
  `IdTarea` int(11) NOT NULL,
  `texto` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `aw_tareas_tareas`
--

INSERT INTO `aw_tareas_tareas` (`IdTarea`, `texto`) VALUES
(1, 'Preparar Prácticas AW'),
(2, 'Mirar fechas del congreso'),
(3, 'Ir al supermercado'),
(4, 'Jugar al fútbol'),
(5, 'Hablar con profesor');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `aw_tareas_tareas_etiquetas`
--

CREATE TABLE `aw_tareas_tareas_etiquetas` (
  `IdTarea` int(11) NOT NULL,
  `idEtiqueta` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `aw_tareas_tareas_etiquetas`
--

INSERT INTO `aw_tareas_tareas_etiquetas` (`IdTarea`, `idEtiqueta`) VALUES
(1, 1),
(1, 2),
(3, 3),
(3, 4),
(4, 3),
(4, 5),
(5, 1),
(5, 6);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `aw_tareas_user_tareas`
--

CREATE TABLE `aw_tareas_user_tareas` (
  `idUser` int(11) NOT NULL,
  `idTarea` int(11) NOT NULL,
  `hecho` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `aw_tareas_user_tareas`
--

INSERT INTO `aw_tareas_user_tareas` (`idUser`, `idTarea`, `hecho`) VALUES
(1, 1, 0),
(1, 2, 1),
(1, 3, 0),
(1, 4, 0),
(1, 5, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `aw_tareas_usuarios`
--

CREATE TABLE `aw_tareas_usuarios` (
  `IdUser` int(11) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `img` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `aw_tareas_usuarios`
--

INSERT INTO `aw_tareas_usuarios` (`IdUser`, `email`, `password`, `img`) VALUES
(1, 'usuario@ucm.es', 'usuario', NULL);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `aw_tareas_etiquetas`
--
ALTER TABLE `aw_tareas_etiquetas`
  ADD PRIMARY KEY (`IdEtiqueta`);

--
-- Indices de la tabla `aw_tareas_tareas`
--
ALTER TABLE `aw_tareas_tareas`
  ADD PRIMARY KEY (`IdTarea`);

--
-- Indices de la tabla `aw_tareas_tareas_etiquetas`
--
ALTER TABLE `aw_tareas_tareas_etiquetas`
  ADD KEY `IdTarea` (`IdTarea`),
  ADD KEY `idEtiqueta` (`idEtiqueta`);

--
-- Indices de la tabla `aw_tareas_user_tareas`
--
ALTER TABLE `aw_tareas_user_tareas`
  ADD KEY `idUser` (`idUser`),
  ADD KEY `idTarea` (`idTarea`);

--
-- Indices de la tabla `aw_tareas_usuarios`
--
ALTER TABLE `aw_tareas_usuarios`
  ADD PRIMARY KEY (`IdUser`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `aw_tareas_etiquetas`
--
ALTER TABLE `aw_tareas_etiquetas`
  MODIFY `IdEtiqueta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `aw_tareas_tareas`
--
ALTER TABLE `aw_tareas_tareas`
  MODIFY `IdTarea` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `aw_tareas_usuarios`
--
ALTER TABLE `aw_tareas_usuarios`
  MODIFY `IdUser` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `aw_tareas_tareas_etiquetas`
--
ALTER TABLE `aw_tareas_tareas_etiquetas`
  ADD CONSTRAINT `aw_tareas_tareas_etiquetas_ibfk_1` FOREIGN KEY (`IdTarea`) REFERENCES `aw_tareas_tareas` (`IdTarea`),
  ADD CONSTRAINT `aw_tareas_tareas_etiquetas_ibfk_2` FOREIGN KEY (`idEtiqueta`) REFERENCES `aw_tareas_etiquetas` (`IdEtiqueta`);

--
-- Filtros para la tabla `aw_tareas_user_tareas`
--
ALTER TABLE `aw_tareas_user_tareas`
  ADD CONSTRAINT `aw_tareas_user_tareas_ibfk_1` FOREIGN KEY (`idUser`) REFERENCES `aw_tareas_usuarios` (`IdUser`),
  ADD CONSTRAINT `aw_tareas_user_tareas_ibfk_2` FOREIGN KEY (`idTarea`) REFERENCES `aw_tareas_tareas` (`IdTarea`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
