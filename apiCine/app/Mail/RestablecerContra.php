<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use Illuminate\Mail\Mailables\Address;

class RestablecerContra extends Mailable
{
    use Queueable, SerializesModels;

    public $usuario;
    public $pass;

    /**
     * Create a new message instance.
     */
    public function __construct($usuario, $pass)
    {
        $this->usuario = $usuario;
        $this->pass = $pass;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            from: new Address('ingreso@appcine.com','Administrador'),
            subject: 'Restablecimiento de contraseña',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'mail.restContra',
            with: [
                'usuario' => $this->usuario,
                'pass' => $this->pass
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
