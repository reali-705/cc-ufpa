export class UiLogger {
    private saidaElement: HTMLPreElement | null;
    constructor() {
        this.saidaElement = document.getElementById('saida') as HTMLPreElement;
        if (!this.saidaElement) {
            console.error("Elemento HTML com ID 'saida' não encontrado. O logger não funcionará na UI.");
        }
    }
    log(mensagem: string): void {
        if (this.saidaElement) {
            this.saidaElement.textContent += mensagem + '\n';
            this.saidaElement.scrollTop = this.saidaElement.scrollHeight;
        } else {
            console.log(mensagem);
        }
    }
    clear(): void {
        if (this.saidaElement) {
            this.saidaElement.textContent = '';
        }
    }
}