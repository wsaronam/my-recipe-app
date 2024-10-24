import React, { useRef, useState } from 'react';

export default function RecipePage() {
  
    return (
      <div>
        <h1>My Recipe App!</h1>
          <form onSubmit={handleSubmit}>
              Recipe Search<br />
              <input id="userInput" ref={inputRef} type="text" /><br />
              <button type="submit">Find recipes!</button>
          </form>
          {isSubmitted && recipes.length > 0 && (
            <RecipeTable props={recipes} />
          )}
      </div>
    );
  }