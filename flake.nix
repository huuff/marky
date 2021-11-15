{
  description = "Markdown editor and previewer";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
  };
  
  outputs = { self, nixpkgs, ... }:
  let
    system = "86_64-linux";
    pkgs = import nixpkgs { inherit system; };
  in with pkgs;
  {
    devShell.${system} = mkShell {
      buildInputs = [ nodejs-17_x nodePackages.npm ];
    };
  };
}

