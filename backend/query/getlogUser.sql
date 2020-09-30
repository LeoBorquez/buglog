CREATE PROCEDURE [dbo].[getLogUser] @FechaIni VARCHAR(10), @FechaFin VARCHAR(10), @Rut VARCHAR(10)

AS

BEGIN 

	SELECT 
			DISTINCT RTRIM(CONVERT(char, a.ACC_RUT_CLIENTE_NN)) +'-'+ a.ACC_DV_RUT_CLIENTE_CR AS 'rutCliente'	
			,a.ACC_HOST_IP AS 'ipCliente'	
			,a.ACC_FECHA_FC AS 'fecha'
			,dap.dac_glosa_cr AS 'evento'
			,eap.eac_glosa_cr AS 'errorDetalle' 
		FROM [ACCION] a
		INNER JOIN [DETALLE_ACCION_PASOS] dap
		ON a.acc_accion_id  = dap.dac_accion_id 
		INNER JOIN [ERROR_ACCION] eap
		ON a.acc_accion_id COLLATE SQL_Latin1_General_CP1_CI_AS = eap.eac_accion_id COLLATE SQL_Latin1_General_CP1_CI_AS
		WHERE a.acc_fecha_fc BETWEEN @FechaIni and @FechaFin
		AND a.ACC_RUT_CLIENTE_NN = @Rut
		ORDER BY a.acc_fecha_fc DESC

END;