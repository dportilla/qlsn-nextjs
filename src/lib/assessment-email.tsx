import { type Assessment, detailsFor } from './assessment-email-content';

export function AssessmentEmail({ assessment }: { assessment: Assessment }) {
  return (
    <html lang="es">
      <body
        style={{
          margin: 0,
          padding: '32px 12px',
          backgroundColor: '#f3f5f2',
          fontFamily: 'Arial, Helvetica, sans-serif',
          color: '#1b241d',
        }}
      >
        <div style={{ display: 'none', maxHeight: 0, overflow: 'hidden' }}>
          Nueva solicitud de evaluación de {assessment.firstName}{' '}
          {assessment.lastName}.
        </div>
        <table
          role="presentation"
          cellPadding={0}
          cellSpacing={0}
          style={{
            width: '100%',
            maxWidth: 620,
            margin: '0 auto',
            borderCollapse: 'collapse',
            backgroundColor: '#ffffff',
          }}
        >
          <tbody>
            <tr>
              <td
                style={{
                  padding: '36px 40px 40px',
                  backgroundColor: '#17251c',
                  color: '#ffffff',
                }}
              >
                <p
                  style={{
                    margin: '0 0 40px',
                    fontSize: 21,
                    fontWeight: 700,
                    letterSpacing: '-0.5px',
                  }}
                >
                  Qualysyn<span style={{ color: '#a9c3a7' }}>.</span>
                </p>
                <p
                  style={{
                    margin: '0 0 12px',
                    color: '#b8d0b6',
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: '1.8px',
                  }}
                >
                  NUEVA SOLICITUD
                </p>
                <h1
                  style={{
                    margin: 0,
                    fontSize: 30,
                    fontWeight: 700,
                    lineHeight: 1.2,
                    letterSpacing: '-0.7px',
                  }}
                >
                  Evaluación de instalaciones y equipos
                </h1>
              </td>
            </tr>
            <tr>
              <td style={{ padding: '36px 40px 40px' }}>
                <p
                  style={{
                    margin: '0 0 32px',
                    color: '#526057',
                    fontSize: 15,
                    lineHeight: 1.65,
                  }}
                >
                  Recibiste una nueva solicitud desde el sitio web. Estos son
                  los datos para revisar y responder.
                </p>
                <h2
                  style={{
                    margin: '0 0 12px',
                    color: '#2d4e36',
                    fontSize: 12,
                    fontWeight: 700,
                    letterSpacing: '1.2px',
                  }}
                >
                  DATOS DE CONTACTO
                </h2>
                <table
                  role="presentation"
                  cellPadding={0}
                  cellSpacing={0}
                  style={{ width: '100%', borderCollapse: 'collapse' }}
                >
                  <tbody>
                    {detailsFor(assessment).map(([label, value]) => (
                      <tr key={label}>
                        <td
                          style={{
                            width: 110,
                            padding: '14px 12px 14px 0',
                            borderTop: '1px solid #e5eae5',
                            color: '#637168',
                            fontSize: 13,
                            verticalAlign: 'top',
                          }}
                        >
                          {label}
                        </td>
                        <td
                          style={{
                            padding: '14px 0',
                            borderTop: '1px solid #e5eae5',
                            color: '#1b241d',
                            fontSize: 14,
                            fontWeight: 600,
                            lineHeight: 1.5,
                            overflowWrap: 'anywhere',
                          }}
                        >
                          {value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <h2
                  style={{
                    margin: '30px 0 12px',
                    color: '#2d4e36',
                    fontSize: 12,
                    fontWeight: 700,
                    letterSpacing: '1.2px',
                  }}
                >
                  MENSAJE
                </h2>
                <div
                  style={{
                    padding: '20px 22px',
                    borderLeft: '3px solid #2d4e36',
                    backgroundColor: '#f3f6f2',
                    color: '#263129',
                    fontSize: 14,
                    lineHeight: 1.7,
                    overflowWrap: 'anywhere',
                    whiteSpace: 'pre-wrap',
                  }}
                >
                  {assessment.message}
                </div>
                <p
                  style={{
                    margin: '28px 0 0',
                    color: '#637168',
                    fontSize: 13,
                    lineHeight: 1.6,
                  }}
                >
                  Puedes responder directamente a este correo para contactar a
                  la persona que envió la solicitud.
                </p>
              </td>
            </tr>
          </tbody>
        </table>
        <p
          style={{
            maxWidth: 620,
            margin: '18px auto 0',
            color: '#78857c',
            fontSize: 12,
            lineHeight: 1.5,
            textAlign: 'center',
          }}
        >
          Qualysyn · Solicitud enviada desde el formulario del sitio web
        </p>
      </body>
    </html>
  );
}
