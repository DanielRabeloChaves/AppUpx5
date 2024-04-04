const messagesEmail = {
assuntoTokenLogin: "Código de verificação.",
bodyTokenLogin:(name, email, codigo) => `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Template</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: rgb(235, 235, 235);">
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;">
        <tr>
            <td bgcolor="#3F7EAF" style="padding: 20px 0; text-align: center;">
                <h1 style="color: white;">UPX5</h1>
                <p style="color: white; font-size: 18px;">Trabalho em grupo UPX5</p>
            </td>
        </tr>
        <tr>
            <td bgcolor="white" style="padding: 40px 70px;">
                <p style="text-align: center; font-size: 28px; color: #3F7EAF;">Prezado ${name},</p>
                <p style="text-align: center;">Seu código de verificação é:</p>
                <h1 style="text-align: center; font-size: 48px; letter-spacing: 7px;">${codigo}</h1>
                <p style="text-align: center;">Sua conta não pode ser acessada sem este código de verificação, mesmo que você não tenha enviado esta solicitação.</p>
                <p style="text-align: center;">A autenticação de dois fatores é uma forma segura de garantir a sua identidade de registro. Se você não solicitou acesso a sua conta, ignore este email e não compartilhe esse código com ninguém.</p>
                <p style="text-align: center;">${email}</p>
            </td>
        </tr>
        <tr>
            <td bgcolor="#3F7EAF" style="padding: 20px; text-align: center;">
                <p style="color: white;">Abraços, Equipe UPX5.</p>
            </td>
        </tr>
    </table>
</body>
</html>`,
};


module.exports = {
    messagesEmail
};