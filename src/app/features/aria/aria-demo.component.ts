import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Menu, MenuItem, MenuTrigger } from '@angular/aria/menu';
import { Listbox, Option } from '@angular/aria/listbox';
import { Tree, TreeItem, TreeItemGroup } from '@angular/aria/tree';

/*
  Using official @angular/aria primitives (Developer Preview).
  These directives provide full accessibility (keyboard nav, focus management, ARIA roles)
  while leaving the DOM structure and styling completely up to you.
*/

@Component({
  selector: 'app-aria-demo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    Menu,
    MenuItem,
    MenuTrigger,

    Listbox,
    Option,
    Tree,
    TreeItem,
    TreeItemGroup,
  ],
  template: `
    <div class="card bg-base-100 shadow-xl m-4">
      <div class="card-body">
        <h2 class="card-title text-2xl mb-4">Angular Aria (Official primitives)</h2>
        <p class="mb-4">Headless, accessible directives for Menu, Listbox, and Tree.</p>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <!-- Menu Demo -->
          <div class="p-4 border rounded-box">
            <h3 class="font-bold mb-4">Accessible Menu</h3>
            <p class="text-xs mb-4 opacity-70">
              Click to open. Use Arrows to navigate. Esc to close.
            </p>

            <button class="btn btn-neutral" ngMenuTrigger [menu]="myMenu">Options ▾</button>

            <!-- 
              The menu directive applies role="menu", handles focus trap, etc.
              We style it as a dropdown via daisyUI classes.
            -->
            <div
              ngMenu
              #myMenu="ngMenu"
              class="menu bg-base-200 w-56 rounded-box shadow-lg mt-2 border border-base-300 z-50"
            >
              <div
                ngMenuItem
                [value]="'profile'"
                class="p-2 hover:bg-base-300 rounded cursor-pointer outline-none focus:bg-primary focus:text-primary-content"
              >
                Profile
              </div>
              <div
                ngMenuItem
                [value]="'settings'"
                class="p-2 hover:bg-base-300 rounded cursor-pointer outline-none focus:bg-primary focus:text-primary-content"
              >
                Settings
              </div>
              <div class="divider my-0"></div>
              <div
                ngMenuItem
                [value]="'logout'"
                class="p-2 hover:bg-base-300 rounded cursor-pointer outline-none focus:bg-error focus:text-error-content"
              >
                Logout
              </div>
            </div>
          </div>

          <!-- Listbox Demo -->
          <div class="p-4 border rounded-box">
            <h3 class="font-bold mb-4">Accessible Listbox</h3>
            <p class="text-xs mb-4 opacity-70">Use Up/Down arrows to select.</p>

            <div class="flex flex-col gap-2">
              <span id="lb-label" class="font-semibold text-sm">Select Role:</span>

              <ul
                ngListbox
                [(values)]="selectedRoles"
                aria-labelledby="lb-label"
                class="menu bg-base-100 border rounded-box w-full p-2 gap-1 h-48 overflow-y-auto"
              >
                @for (role of roles; track role.id) {
                <li
                  ngOption
                  [value]="role.id"
                  class="p-2 rounded cursor-pointer outline-none hover:bg-base-200 focus:bg-primary focus:text-primary-content aria-selected:font-bold aria-selected:bg-base-300"
                >
                  <div class="flex justify-between items-center">
                    <span>{{ role.name }}</span>
                    @if (selectedRoles().includes(role.id)) {
                    <span>✓</span>
                    }
                  </div>
                </li>
                }
              </ul>
              <div class="text-xs mt-2">Selected: {{ selectedRoles().join(', ') }}</div>
            </div>
          </div>

          <!-- Tree Demo -->
          <div class="p-4 border rounded-box">
            <h3 class="font-bold mb-4">Accessible Tree</h3>
            <p class="text-xs mb-4 opacity-70">
              Navigation: Arrows (Right to expand, Left to collapse).
            </p>

            <ul ngTree #tree="ngTree" class="menu bg-base-100 w-full rounded-box gap-1">
              <ng-template
                [ngTemplateOutlet]="treeNodeTemplate"
                [ngTemplateOutletContext]="{ $implicit: fileSystemData, parent: tree }"
              ></ng-template>
            </ul>

            <ng-template #treeNodeTemplate let-nodes let-parent="parent">
              @for (node of nodes; track node.name) {
              <li
                ngTreeItem
                [parent]="parent"
                [value]="node.name"
                [label]="node.name"
                #treeItem="ngTreeItem"
                class="gap-0 block"
              >
                <!-- Tree Item Content -->
                <div
                  class="flex items-center gap-2 p-2 rounded hover:bg-base-200 cursor-pointer outline-none focus:bg-primary focus:text-primary-content"
                >
                  @if (node.children) {
                  <span class="text-xs w-4">
                    {{ treeItem.expanded() ? '▼' : '▶' }}
                  </span>
                  } @else {
                  <span class="w-4"></span>
                  }
                  <span>{{ node.name }}</span>
                </div>

                <!-- Recursive Children -->
                @if (node.children) {
                <ul
                  role="group"
                  [class.hidden]="!treeItem.expanded()"
                  class="ml-4 pl-2 border-l border-base-300"
                >
                  <ng-template ngTreeItemGroup [ownedBy]="treeItem" #group="ngTreeItemGroup">
                    <ng-template
                      [ngTemplateOutlet]="treeNodeTemplate"
                      [ngTemplateOutletContext]="{ $implicit: node.children, parent: group }"
                    ></ng-template>
                  </ng-template>
                </ul>
                }
              </li>
              }
            </ng-template>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class AriaDemoComponent {
  // Data for Listbox
  roles = [
    { id: 'admin', name: 'Administrator' },
    { id: 'editor', name: 'Content Editor' },
    { id: 'viewer', name: 'Viewer' },
    { id: 'guest', name: 'Guest' },
  ];
  selectedRoles = signal(['viewer']);

  // Data for Tree
  fileSystemData = [
    {
      name: 'src',
      children: [
        { name: 'app', children: [{ name: 'app.component.ts' }, { name: 'app.config.ts' }] },
        { name: 'assets', children: [{ name: 'logo.png' }] },
        { name: 'main.ts' },
      ],
    },
    {
      name: 'angular.json',
    },
    {
      name: 'package.json',
    },
  ];
}
