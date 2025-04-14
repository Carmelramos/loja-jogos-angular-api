import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProdutoService } from '../../servicos/produto.service';


@Component({
  standalone: true,  // <-- Importante para standalone Angular 19
  selector: 'app-cadastro-produto',
  templateUrl: './cadastro-produto.component.html',
  styleUrls: ['./cadastro-produto.component.css'],
  imports: [CommonModule, FormsModule] // <-- Certifique-se de importar CommonModule e FormsModule
})
export class CadastroProdutoComponent {
  produto: any = {
    produto: '',
    descricao: '',
    foto: '',
    preco: null
  };

  constructor(
    private produtoService: ProdutoService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.produtoService.obterProdutoPorId(Number(id)).subscribe({
        next: (dados) => {
          this.produto = dados;
        },
        error: (erro) => {
          console.error('Erro ao obter produto:', erro);
        }
      });
    }
  }  

  salvarProduto(): void {
    const operacao = this.produto.id 
      ? this.produtoService.atualizarProduto(this.produto.id, this.produto) 
      : this.produtoService.adicionarProduto(this.produto);
  
    operacao.subscribe({
      next: () => {
        alert(`Produto ${this.produto.id ? 'atualizado' : 'cadastrado'} com sucesso!`);
        this.router.navigate(['/painel-principal']);
      },
      error: (erro) => {
        console.error('Erro ao salvar produto:', erro);
      }
    });  
  }
}

