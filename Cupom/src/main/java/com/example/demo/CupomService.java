package com.example.demo;

import org.springframework.stereotype.Service;
import java.math.BigDecimal;

@Service
public class CupomService {
    private CupomRepository cupomRepository = new CupomRepositoryI();
    public CupomService(CupomRepository cupomRepository) {
        this.cupomRepository = cupomRepository;
    }

    public Cupom criarCupom(Cupom cupom) {
        return cupomRepository.save(cupom);
    }

    public void deletarCupom(Cupom cupom) {
        cupomRepository.delete(cupom);
    }
    
    public Cupom buscarCupomPorId(Long id) {
        return cupomRepository.findById(id).orElseThrow(() -> new CupomNotFoundException("Cupom não encontrado"));
    }

    public BigDecimal calcularValorDesconto(Cupom cupom, BigDecimal valorOriginal) {
    	BigDecimal porcentagemDesconto = BigDecimal.valueOf(cupom.getPorcentagemDesconto());
        BigDecimal divisor = new BigDecimal(100);

        return valorOriginal.multiply(porcentagemDesconto).divide(divisor);
    }
}