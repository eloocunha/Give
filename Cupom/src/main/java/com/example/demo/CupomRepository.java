package com.example.demo;

import java.util.List;
import java.util.Optional;


public interface CupomRepository {

    Cupom save(Cupom cupom);
    
    void delete(Cupom cupom);

    Optional<Cupom> findById(Long id);

    List<Cupom> buscar(String nome);
    

}