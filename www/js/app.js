// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('app', ['ionic', 
  'app.controllers',
  'app.mapaForca',
  'app.card',
  'app.cards',
  'app.novomapaForca',
  'app.novocard',
  'app.tarefa',
  'app.novatarefanpc',
  'app.novonpc',
  'app.editarmapaForca',
  'app.editartarefanpc',
  'app.editarnpc',
  'app.luta',
  'app.lutacnv',
  'app.lutacnv2',
  'app.combate',
  'app.combates',
  'app.game',  
  'app.jogador',
  'app.npc', 
  'app.npcs', 
  'app.quest',
  'app.user',
  'app.users'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {

    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    cache: false,
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: 'AppCtrl'
  })


  .state('app.search', {
    cache: false,
    url: "/search",
    views: {
      'menuContent': {
        templateUrl: "templates/search.html"
      }
    }
  })

  .state('app.browse', {
    cache: false,
    url: "/browse",
    views: {
      'menuContent': {
        templateUrl: "templates/browse.html",
        controller: 'BrowseCtrl'
      }
    }
  })
   .state('app.game', {
    cache: false,
    url: "/game",
    views: {
      'menuContent': {
        templateUrl: "templates/game.html",
        controller: 'GameCtrl'
      }
    }
  })
   .state('app.luta', {
    cache: false,
    url: "/luta/:namespace/:id/:idinimigo",
    views: {
      'menuContent': {
        templateUrl: "templates/luta.html",
        controller: 'LutaCtrl'
      }
    }
  }) 
   .state('app.lutacnv', {
    cache: false,
    url: "/lutacnv/:namespace/:id/:idinimigo",
    views: {
      'menuContent': {
        templateUrl: "templates/lutacnv.html",
        controller: 'LutaCnvCtrl'
      }
    }
  }) 
   .state('app.lutacnv2', {
    cache: false,
    url: "/lutacnv2/:namespace/:id/:idinimigo",
    views: {
      'menuContent': {
        templateUrl: "templates/lutacnv2.html",
        controller: 'LutaCnv2Ctrl'
      }
    }
  }) 
   .state('app.tabuleiro', {
    cache: false,
    url: "/tabuleiro/:namespace/:id/:idinimigo",
    views: {
      'menuContent': {
        templateUrl: "templates/tabuleiro.html",
        controller: 'LutaCtrl'
      }
    }
  }) 
    .state('app.jogadores', {
      cache: false,
      url: "/jogadores",
      views: {
        'menuContent': {
          templateUrl: "templates/jogadores.html",
          controller: 'JogadoresCtrl'
        }
      }
    })

    .state('app.novojogador', {
      cache: false,
      url: "/novojogador",
      views: {
        'menuContent': {
          templateUrl: "templates/novoJogador.html",
          controller: 'JogadorCtrl'
        }
      }
    })

  .state('app.jogador', {
    cache: false,
    url: "/jogador/:namespace",
    views: {
      'menuContent': {
        templateUrl: "templates/jogador.html",
        controller: 'JogadorCtrl'
      }
    }
  })
  .state('app.editarjogador', {
    cache: false,
    url: "/editarjogador/:namespace",
    views: {
      'menuContent': {
        templateUrl: "templates/editarJogador.html",
        controller: 'JogadorCtrl'
      }
    }
  })
   .state('app.users', {
      cache: false,
      url: "/users",
      views: {
        'menuContent': {
          templateUrl: "templates/users.html",
          controller: 'UsersCtrl'
        }
      }
    })

    .state('app.novouser', {
      cache: false,
      url: "/novouser",
      views: {
        'menuContent': {
          templateUrl: "templates/novoUser.html",
          controller: 'NovoUserCtrl'
        }
      }
    })

  .state('app.user', {
    cache: false,
    url: "/user/:namespace",
    views: {
      'menuContent': {
        templateUrl: "templates/user.html",
        controller: 'UserCtrl'
      }
    }
  })
  .state('app.editaruser', {
    cache: false,
    url: "/editaruser/:namespace",
    views: {
      'menuContent': {
        templateUrl: "templates/editarUser.html",
        controller: 'UserCtrl'
      }
    }
  })
    .state('app.combates', {
      cache: false,
      url: "/combates",
      views: {
        'menuContent': {
          templateUrl: "templates/combates.html",
          controller: 'CombatesCtrl'
        }
      }
    })

    .state('app.novocombate', {
      cache: false,
      url: "/novocombate",
      views: {
        'menuContent': {
          templateUrl: "templates/novoCombate.html",
          controller: 'NovoCombateCtrl'
        }
      }
    })

  .state('app.combate', {
    cache: false,
    url: "/combate/:namespace",
    views: {
      'menuContent': {
        templateUrl: "templates/combate.html",
        controller: 'CombateCtrl'
      }
    }
  })
  .state('app.editarcombate', {
    cache: false,
    url: "/editarcombate/:namespace",
    views: {
      'menuContent': {
        templateUrl: "templates/editarCombate.html",
        controller: 'CombateCtrl'
      }
    }
  })
    .state('app.cards', {
      cache: false,
      url: "/cards",
      views: {
        'menuContent': {
          templateUrl: "templates/cards.html",
          controller: 'CardsCtrl'
        }
      }
    })

    .state('app.novocard', {
      cache: false,
      url: "/novocard/:namespace",
      views: {
        'menuContent': {
          templateUrl: "templates/novoCard.html",
          controller: 'NovoCardCtrl'
        }
      }
    })

  .state('app.card', {
    cache: false,
    url: "/card/:namespace",
    views: {
      'menuContent': {
        templateUrl: "templates/card.html",
        controller: 'CardCtrl'
      }
    }
  })
  .state('app.editarcard', {
    cache: false,
    url: "/editarcard/:namespace/:id",
    views: {
      'menuContent': {
        templateUrl: "templates/editarCard.html",
        controller: 'CardCtrl'
      }
    }
  })
  .state('app.mapaForcas', {
      cache: false,
      url: "/mapaForcas/:namespace",
      views: {
        'menuContent': {
          templateUrl: "templates/mapaForcas.html",
          controller: 'MapaForcaCtrl'
        }
      }
    })

    .state('app.novomapaForca', {
      cache: false,
      url: "/novomapaForca/:namespace",
      views: {
        'menuContent': {
          templateUrl: "templates/novoMapaForca.html",
          controller: 'NovoMapaForcaCtrl'
        }
      }
    })
  .state('app.novatarefamapaforca', {
    cache: false,
      url: "/novatarefamapaforca/:namespace/:id",
      views: {
        'menuContent': {
          templateUrl: "templates/novaTarefaMapaForca.html",
          controller: 'MapaForcaCtrl'
        }
      }
    })
  .state('app.mapaForca', {
    cache: false,
    url: "/mapaForca/:namespace",
    views: {
      'menuContent': {
        templateUrl: "templates/mapaForca.html",
        controller: 'MapaForcaCtrl'
      }
    }
  })
  .state('app.editarmapaForca', {
    cache: false,
    url: "/editarmapaForca/:namespace/:id",
    views: {
      'menuContent': {
        templateUrl: "templates/editarMapaForca.html",
        controller: 'EditarMapaForcaCtrl'
      }
    }
  })

  .state('app.novatarefa', {
    cache: false,
      url: "/novatarefa/:namespace/:id",
      views: {
        'menuContent': {
          templateUrl: "templates/novaTarefa.html",
          controller: 'TarefaCtrl'
        }
      }
    })
  .state('app.editartarefa', {
    cache: false,
      url: "/editartarefa/:namespace/:id/:idtarefa",
      views: {
        'menuContent': {
          templateUrl: "templates/editarTarefa.html",
          controller: 'TarefaCtrl'
        }
      }
    })
    .state('app.npcs', {
      cache: false,
      url: "/npcs/:namespace",
      views: {
        'menuContent': {
          templateUrl: "templates/npcs.html",
          controller: 'NpcsCtrl'
        }
      }
    })

    .state('app.novonpc', {
      cache: false,
      url: "/novonpc/:namespace",
      views: {
        'menuContent': {
          templateUrl: "templates/novoNpc.html",
          controller: 'NovoNpcCtrl'
        }
      }
    })

  .state('app.npc', {
    cache: false,
    url: "/npc/:namespace",
    views: {
      'menuContent': {
        templateUrl: "templates/npc.html",
        controller: 'NpcCtrl'
      }
    }
  })
  .state('app.editarnpc', {
    cache: false,
    url: "/editarnpc/:namespace/:id",
    views: {
      'menuContent': {
        templateUrl: "templates/editarNpc.html",
        controller: 'EditarNpcCtrl'
      }
    }
  })

  .state('app.novatarefanpc', {
    cache: false,
      url: "/novatarefanpc/:namespace/:id",
      views: {
        'menuContent': {
          templateUrl: "templates/novaTarefaNpc.html",
          controller: 'NovaTarefaNpcCtrl'
        }
      }
    })
  .state('app.editartarefanpc', {
    cache: false,
      url: "/editartarefanpc/:namespace/:id/:idtarefanpc",
      views: {
        'menuContent': {
          templateUrl: "templates/editarTarefaNpc.html",
          controller: 'EditarTarefaNpcCtrl'
        }
      }
    })
    .state('app.quests', {
      cache: false,
      url: "/quests",
      views: {
        'menuContent': {
          templateUrl: "templates/quests.html",
          controller: 'QuestCtrl'
        }
      }
    })

    .state('app.novaquest', {
      cache: false,
      url: "/novaquest/:namespace",
      views: {
        'menuContent': {
          templateUrl: "templates/novaQuest.html",
          controller: 'QuestCtrl'
        }
      }
    })

  .state('app.quest', {
    cache: false,
    url: "/quest/:namespace",
    views: {
      'menuContent': {
        templateUrl: "templates/quest.html",
        controller: 'QuestCtrl'
      }
    }
  })
  .state('app.editarquest', {
    cache: false,
    url: "/editarquest/:namespace/:id",
    views: {
      'menuContent': {
        templateUrl: "templates/editarQuest.html",
        controller: 'QuestCtrl'
      }
    }
  })
  .state('app.creditos', {
    cache: false,
    url: "/creditos",
    views: {
      'menuContent': {
        templateUrl: "templates/creditos.html",
        controller: 'CombateCtrl'
      }
    }
  })
  .state('app.sobre', {
    cache: false,
    url: "/sobre",
    views: {
      'menuContent': {
        templateUrl: "templates/sobre.html",
        controller: 'CombateCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/game');
});
