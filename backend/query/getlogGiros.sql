/* 
  Parámetros utilizados para obtener los giros
    @CodigoProducto 
        37 (Giro Cuenta 2)
        38 (Giro APV)
    @FechaIni : Se debe ingresar en formato yyy-MM-dd    
    @FechaFin : Se debe ingresar en formato yyy-MM-dd    
*/
/* 
  Parámetros utilizados para obtener los giros
    @CodigoProducto 
        37 (Giro Cuenta 2)
        38 (Giro APV)
    @FechaIni : Se debe ingresar en formato yyy-MM-dd    
    @FechaFin : Se debe ingresar en formato yyy-MM-dd    
*/

/* 
  Parámetros utilizados para obtener los giros
    @CodigoProducto 
        37 (Giro Cuenta 2)
        38 (Giro APV)
    @FechaIni : Se debe ingresar en formato yyy-MM-dd    
    @FechaFin : Se debe ingresar en formato yyy-MM-dd    
*/

CREATE PROCEDURE [dbo].[getLogGiros] @FechaIni VARCHAR(10), @FechaFin VARCHAR(10), @CodigoProducto INT, @Rut VARCHAR(10)

AS 

BEGIN

WITH q AS (
	SELECT
			RTRIM(CONVERT(char,
					a.ACC_RUT_CLIENTE_NN)) + '-' + a.ACC_DV_RUT_CLIENTE_CR AS 'rutCliente',
			a.ACC_HOST_IP AS 'ipCliente',
			t.TRX_FECHA_TRANSACCION_FC AS 'fecha',
			t.TRX_FOLIO_TRANSACCION_NN AS 'transaccion',
			CASE t.TRX_ESTADO_TA
			WHEN 'ACE' THEN
				'OK'
			WHEN 'REC' THEN
				'NOK'
			ELSE
				''
			END AS 'estado',
			'' AS 'errorDetalle'
		FROM
			TRANSACCION_PASOS t
			INNER JOIN ACCION a ON a.ACC_ACCION_ID = t.TRX_ACCION_ID
				AND a.ACC_RUT_CLIENTE_NN = @Rut
				AND a.ACC_OPERACION_TA = t.TRX_OPERACION_TA
				AND a.ACC_SECUENCIA_ACCION_ID = t.TRX_SECUENCIA_ACCION
				AND t.TRX_FECHA_TRANSACCION_FC BETWEEN @FechaIni AND @FechaFin
				AND t.TRX_ESTADO_TA = 'ACE'
				AND t.TRX_OPERACION_TA = @CodigoProducto
)
SELECT
	*
FROM
	q
ORDER BY
	q. [fecha] DESC

END;