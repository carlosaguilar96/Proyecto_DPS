<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use Illuminate\Mail\Mailables\Address;

class ConfirmarCompra extends Mailable
{
    use Queueable, SerializesModels;

    public $nombre;
    public $funcion;
    public $boletos;
    public $boletosN;
    public $total;
    public $fecha;
    public $tarjeta;
    public $pelicula;
    public $sala;

    /**
     * Create a new message instance.
     */
    public function __construct($nombre, $funcion, $boletos, $boletosN, $total, $fecha, $tarjeta, $pelicula, $sala)
    {
        
        $this->nombre = $nombre;
        $this->funcion = $funcion;
        $this->boletos = $boletos;
        $this->boletosN = $boletosN;
        $this->total = $total;
        $this->fecha = $fecha;
        $this->tarjeta = $tarjeta;
        $this->pelicula = $pelicula;
        $this->sala = $sala;

    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            from: new Address('compras@appcine.com','Servicio al cliente'),
            subject: 'Recibo de compra',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'mail.confirmarCompra',
            with: [
                'nombre' => $this->nombre,
                'funcion' => $this->funcion,
                'boletos' => $this->boletos,
                'boletosN' => $this->boletosN,
                'total' => $this->total,
                'fecha' => $this->fecha,
                'tarjeta' => $this->tarjeta,
                'pelicula' => $this->pelicula,
                'sala' => $this->sala
            ]
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
