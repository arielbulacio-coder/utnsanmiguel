import React from 'react';

const CppBasicsTheory = () => {
    const codeStyle = {
        background: '#1e1e1e',
        color: '#d4d4d4',
        padding: '1rem',
        borderRadius: '8px',
        overflow: 'auto',
        fontSize: '0.85rem',
        fontFamily: 'Consolas, Monaco, monospace',
        margin: '0.5rem 0'
    };

    return (
        <div className="glass-card section-container">
            <h2>Programación en C/C++ para Arduino</h2>
            <p>
                Arduino utiliza un lenguaje basado en <strong>C/C++</strong> con funciones preconfiguradas que simplifican el acceso al hardware. Aprender las bases de este lenguaje es fundamental para programar cualquier proyecto.
            </p>

            <div className="grid-responsive-2col" style={{ marginTop: '2rem', gap: '1.5rem' }}>
                {/* Variables */}
                <div className="glass-card" style={{ margin: 0, borderTop: '4px solid #3b82f6' }}>
                    <h3 style={{ color: '#3b82f6' }}>📦 Variables y Tipos de Datos</h3>
                    <p style={{ fontSize: '0.9rem' }}>Las variables almacenan valores en memoria:</p>
                    <pre style={codeStyle}>
                        {`int edad = 25;           // Entero (-32768 a 32767)
long distancia = 100000; // Entero largo
float temperatura = 23.5;// Decimal
char letra = 'A';        // Carácter
bool activo = true;      // Booleano (true/false)
String texto = "Hola";   // Cadena de texto

const int PIN_LED = 13;  // Constante (no cambia)`}
                    </pre>
                </div>

                {/* Operators */}
                <div className="glass-card" style={{ margin: 0, borderTop: '4px solid #22c55e' }}>
                    <h3 style={{ color: '#22c55e' }}>🔢 Operadores</h3>
                    <p style={{ fontSize: '0.9rem' }}>Operaciones matemáticas y lógicas:</p>
                    <pre style={codeStyle}>
                        {`// Aritméticos
int suma = 5 + 3;      // 8
int resta = 10 - 4;    // 6
int producto = 3 * 4;  // 12
int division = 15 / 3; // 5
int resto = 17 % 5;    // 2 (módulo)

// Comparación
a == b   // Igual a
a != b   // Diferente de
a > b    // Mayor que
a < b    // Menor que

// Lógicos
&&  // AND (Y)
||  // OR (O)
!   // NOT (NO)`}
                    </pre>
                </div>

                {/* Conditionals */}
                <div className="glass-card" style={{ margin: 0, borderTop: '4px solid #eab308' }}>
                    <h3 style={{ color: '#eab308' }}>🔀 Estructuras Condicionales</h3>
                    <p style={{ fontSize: '0.9rem' }}>Permiten tomar decisiones en el código:</p>
                    <pre style={codeStyle}>
                        {`// IF - ELSE
int sensor = analogRead(A0);

if (sensor > 500) {
    digitalWrite(LED, HIGH);
} else if (sensor > 200) {
    digitalWrite(LED, LOW);
} else {
    // Otra acción
}

// SWITCH - CASE
switch (opcion) {
    case 1:
        // Código para opción 1
        break;
    case 2:
        // Código para opción 2
        break;
    default:
        // Si no coincide ningún caso
        break;
}`}
                    </pre>
                </div>

                {/* Loops */}
                <div className="glass-card" style={{ margin: 0, borderTop: '4px solid #ef4444' }}>
                    <h3 style={{ color: '#ef4444' }}>🔄 Bucles (Loops)</h3>
                    <p style={{ fontSize: '0.9rem' }}>Repetir acciones múltiples veces:</p>
                    <pre style={codeStyle}>
                        {`// FOR - Repetir N veces
for (int i = 0; i < 10; i++) {
    Serial.println(i);
}

// WHILE - Mientras condición sea verdadera
while (digitalRead(BOTON) == LOW) {
    // Esperar a que se presione
}

// DO-WHILE - Ejecuta al menos una vez
do {
    // Código
} while (condicion);`}
                    </pre>
                </div>
            </div>

            {/* Functions */}
            <div className="glass-card" style={{ marginTop: '2rem', borderLeft: '4px solid #a855f7' }}>
                <h3 style={{ color: '#a855f7' }}>🧩 Funciones</h3>
                <p>Las funciones permiten organizar el código en bloques reutilizables:</p>
                <pre style={codeStyle}>
                    {`// Función sin retorno (void)
void encenderLED(int pin) {
    digitalWrite(pin, HIGH);
}

// Función con retorno
int sumar(int a, int b) {
    return a + b;
}

// Función que lee sensor y retorna estado
bool estaCaliente(int pin) {
    int temp = analogRead(pin);
    return temp > 600;
}

// Uso en el programa
void loop() {
    encenderLED(13);
    int resultado = sumar(5, 3);  // resultado = 8
    
    if (estaCaliente(A0)) {
        Serial.println("¡Alerta de temperatura!");
    }
}`}
                </pre>
            </div>

            {/* Arrays */}
            <div className="glass-card" style={{ marginTop: '2rem', borderLeft: '4px solid #14b8a6' }}>
                <h3 style={{ color: '#14b8a6' }}>📊 Arrays (Arreglos)</h3>
                <p>Almacenar múltiples valores del mismo tipo:</p>
                <pre style={codeStyle}>
                    {`// Declarar array de 5 enteros
int leds[] = {2, 3, 4, 5, 6};

// Acceder a elementos (índice desde 0)
int primerLed = leds[0];  // = 2
int tercerLed = leds[2];  // = 4

// Recorrer array con FOR
for (int i = 0; i < 5; i++) {
    pinMode(leds[i], OUTPUT);
}

// Secuencia de luces
for (int i = 0; i < 5; i++) {
    digitalWrite(leds[i], HIGH);
    delay(100);
    digitalWrite(leds[i], LOW);
}`}
                </pre>
            </div>

            {/* Common Arduino Functions */}
            <div className="glass-card" style={{ marginTop: '2rem', background: 'rgba(0, 151, 157, 0.05)', border: '2px solid #00979D' }}>
                <h3 style={{ color: '#00979D' }}>⚡ Funciones Arduino Más Usadas</h3>
                <div className="grid-responsive-2col" style={{ marginTop: '1rem', gap: '1rem' }}>
                    <div>
                        <h4 style={{ color: '#ef4444' }}>Digital I/O</h4>
                        <ul style={{ fontSize: '0.85rem', paddingLeft: '1.2rem' }}>
                            <li><code>pinMode(pin, OUTPUT/INPUT)</code> - Configura pin</li>
                            <li><code>digitalWrite(pin, HIGH/LOW)</code> - Escribe valor</li>
                            <li><code>digitalRead(pin)</code> - Lee valor (0 o 1)</li>
                        </ul>
                    </div>
                    <div>
                        <h4 style={{ color: '#3b82f6' }}>Analog I/O</h4>
                        <ul style={{ fontSize: '0.85rem', paddingLeft: '1.2rem' }}>
                            <li><code>analogRead(pin)</code> - Lee valor (0-1023)</li>
                            <li><code>analogWrite(pin, valor)</code> - PWM (0-255)</li>
                        </ul>
                    </div>
                    <div>
                        <h4 style={{ color: '#22c55e' }}>Tiempo</h4>
                        <ul style={{ fontSize: '0.85rem', paddingLeft: '1.2rem' }}>
                            <li><code>delay(ms)</code> - Pausa en milisegundos</li>
                            <li><code>millis()</code> - Tiempo desde inicio</li>
                            <li><code>micros()</code> - Tiempo en microsegundos</li>
                        </ul>
                    </div>
                    <div>
                        <h4 style={{ color: '#fbbf24' }}>Comunicación Serial</h4>
                        <ul style={{ fontSize: '0.85rem', paddingLeft: '1.2rem' }}>
                            <li><code>Serial.begin(9600)</code> - Inicia comunicación</li>
                            <li><code>Serial.print("texto")</code> - Imprime</li>
                            <li><code>Serial.println()</code> - Imprime con salto</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CppBasicsTheory;
