import {Component, Input, OnInit} from '@angular/core';


type style = "bold" | "broken" | "bulk" | "linear" | "outline" | "twotone"


@Component({
  selector: 'iconx',
  templateUrl: './iconx.component.html',
  standalone: true,
  styleUrls: ['./iconx.component.css']
})

export class IconxComponent implements OnInit {
  @Input() name?: string;
  @Input() width?: string = "24";
  @Input() height?: string = "24";
  @Input() color?: string;
  @Input() iconStyle: style = "linear";
  public iconId?: string;


  public ngOnInit(): void {
    this.iconId = this.generateUUID();
    setTimeout(() => {
      this.insertSvgIntoDiv();
    }, 2)
  }


  private generateUUID(): string {
    let d = new Date().getTime();
    if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
      d += performance.now();
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
  }

  public async insertSvgIntoDiv(): Promise<void> {
    const svgPath = `assets/icons/${this.iconStyle}/${this.name}.svg`;

    try {
      const response = await fetch(svgPath);
      if (!response.ok) {
        throw new Error(`Failed to load SVG: ${response.statusText}`);
      }

      let svgText = await response.text();
      if (this.iconId) {
        const div = document.getElementById(this.iconId);
        if (!div) {
          throw new Error(`Div with id "${this.iconId}" not found`);
        }

        // Cria um elemento div temporário para manipular o SVG
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = svgText;
        const svgElement = tempDiv.querySelector('svg');

        if (svgElement) {
          // Define a largura e a altura no elemento SVG
          if (this.width) {
            svgElement.setAttribute('width', `${this.width}px`);
          }
          if (this.height) {
            svgElement.setAttribute('height', `${this.height}px`);
          }

          if (this.color) {
            if ((this.iconStyle === "bold" || this.iconStyle === "bulk" || this.iconStyle === "outline")) {
              svgElement.querySelectorAll('path').forEach(element => {
                element.setAttribute('fill', `#${this.color}`);
              });
            } else {
              svgElement.querySelectorAll('path').forEach(element => {
                element.setAttribute('stroke', `#${this.color}`);
              });
            }

          }
          // Atualiza o texto do SVG com as novas dimensões
          svgText = tempDiv.innerHTML;
        }

        // Insere o SVG na div alvo
        div.innerHTML = svgText;
      }
    } catch (error) {
      console.error('Error inserting SVG:', error);
    }
  }
}
