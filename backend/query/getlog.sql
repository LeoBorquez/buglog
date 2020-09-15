CREATE PROCEDURE [dbo].[getLogUser] @FechaIni VARCHAR(10), @FechaFin VARCHAR(10), @Rut VARCHAR(10)

AS

BEGIN 

	select 
			distinct RTRIM(CONVERT(char, a.ACC_RUT_CLIENTE_NN)) +'-'+ a.ACC_DV_RUT_CLIENTE_CR as 'rutCliente'	
			,a.ACC_HOST_IP as 'ipCliente'	
			,a.ACC_FECHA_FC as 'fecha'
			,dap.dac_glosa_cr as 'evento'
			,eap.eac_glosa_cr as 'errorDetalle' 
		FROM [ACCION] a
		inner join [DETALLE_ACCION_PASOS] dap
		on a.acc_accion_id  = dap.dac_accion_id 
		inner join [ERROR_ACCION] eap
		on a.acc_accion_id COLLATE SQL_Latin1_General_CP1_CI_AS = eap.eac_accion_id COLLATE SQL_Latin1_General_CP1_CI_AS
		WHERE a.acc_fecha_fc BETWEEN @FechaIni and @FechaFin
		and a.ACC_RUT_CLIENTE_NN = @Rut
		order by a.acc_fecha_fc desc

END;